import { Container } from "pixi.js";
import { Dialogue } from ".";
import { EngineBus, EngineSystem, IEngineEvent, getEngine } from "../../engine";
import { queueNamedAnimate } from "../../engine/rendereffects";
import { DialogueHud } from "./dialoguehud";
import { ADVANCE_DIALOGUE, SELECT_DIALOGUE_CHOICE, START_DIALOGUE, SelectDialogueChoiceEvent, StartDialogueEvent } from "./model";
import { NPC } from "../npc";

export class DialogueCatalog {
    category: string;
    private dialogues: Map<string, Dialogue>;

    constructor(category: string) {
        this.category = category;
        this.dialogues = new Map<string, Dialogue>();
    }

    addDialogue(dialogue: Dialogue) {
        this.dialogues.set(dialogue.dialogueId, dialogue);
    }

    getDialogue(dialogueId: string) {
        return this.dialogues.get(dialogueId);
    }
}

export class DialogueSystem implements EngineSystem {

    private currentDialogue?: Dialogue;
    private currentDialogueLine: number;
    private dialogueCatalogs: Map<string, DialogueCatalog>;
    private dialogueHud: DialogueHud;

    constructor(customDialogueHud?: DialogueHud) {
        EngineBus.on(START_DIALOGUE, this.queue.bind(this));
        EngineBus.on(ADVANCE_DIALOGUE, this.queue.bind(this));
        EngineBus.on(SELECT_DIALOGUE_CHOICE, this.queue.bind(this));

        this.dialogueCatalogs = new Map<string, DialogueCatalog>();
        this.currentDialogueLine = 0;
        if (customDialogueHud) {
            this.dialogueHud = customDialogueHud;
        }
        else {
            this.dialogueHud = new DialogueHud();
        }
        getEngine().getHud().addElementToHud("HUD_DIALOGUE", this.dialogueHud);
    }

    addCatalog(category: string) {
        if (this.dialogueCatalogs.has(category)) {
            return;
        }

        this.dialogueCatalogs.set(category, new DialogueCatalog(category));
    }

    setCatalog(category: string, catalog: DialogueCatalog) {
        this.dialogueCatalogs.set(category, catalog);
    }

    addDialogue(dialogue: Dialogue, category?: string) {
        if (!category) {
            category = "general";
        }

        let cat = this.dialogueCatalogs.get(category);
        if (!cat) {
            this.addCatalog(category);
            cat = this.dialogueCatalogs.get(category);
        }

        cat!.addDialogue(dialogue);
    }

    private beginDialogue(dialogue: Dialogue) {
        this.currentDialogue = dialogue;
        this.currentDialogueLine = 0;
        let line = dialogue.lines[this.currentDialogueLine];
        while (this.handleDialogueCommand(this.currentDialogue.lines[this.currentDialogueLine])) {
            this.currentDialogueLine++;
            if (this.currentDialogueLine >= this.currentDialogue.lines.length) {
                line = "";
                break;
            }
            line = this.currentDialogue.lines[this.currentDialogueLine];
        }
        const hasNext = (this.currentDialogue.lines.length - this.currentDialogueLine) > 1;
        this.dialogueHud.startDialogue(line, dialogue.speaker.name, hasNext);
        this.dialogueHud.clearChoices();
        this.dialogueHud.prepChoices(dialogue.choices.map(c => c.choice));
        dialogue.speaker.setSpeaking(true);
    }

    startDialogue(dialogueId: string, category?: string) {
        if (category) {
            const cat = this.dialogueCatalogs.get(category);
            if (!cat) {
                console.error("Could not find category " + category);
                return;
            }

            const dialogue = cat.getDialogue(dialogueId);
            if (!dialogue) {
                console.error(`Could not find dialogue ${dialogueId} in category ${category}`);
                return;
            }

            this.beginDialogue(dialogue);
            return;
        }

        const cat = this.dialogueCatalogs.get("general");
        if (cat) {
            const dialogue = cat.getDialogue(dialogueId);
            if (dialogue) {
                this.beginDialogue(dialogue);
                return;
            }
        }

        for (const catalog of this.dialogueCatalogs.values()) {
            const dialogue = catalog.getDialogue(dialogueId);
            if (dialogue) {
                this.beginDialogue(dialogue);
                return;
            }
        }

        console.error(`Could not find dialogue ${dialogueId}. Please make sure it has been loaded in.`);
    }

    advanceDialogue() {
        if (!this.currentDialogue) {
            return;
        }

        this.currentDialogueLine++;

        let line = this.currentDialogue.lines[this.currentDialogueLine];
        while (this.handleDialogueCommand(this.currentDialogue.lines[this.currentDialogueLine])) {
            this.currentDialogueLine++;
            if (this.currentDialogueLine >= this.currentDialogue.lines.length) {
                line = "";
                break;
            }
            line = this.currentDialogue.lines[this.currentDialogueLine];
        }

        const hasNext = (this.currentDialogue.lines.length - this.currentDialogueLine) >= 1;
        if (hasNext) {
            this.dialogueHud.nextDialogueLine(line, hasNext);
        }
        else if (!hasNext && this.currentDialogue.choices.length > 0) {
            this.dialogueHud.displayChoices();
        }
        else {
            this.endCurrentDialogue();
        }
    }

    handleDialogueChoice(choiceNum: number) {
        if (!this.currentDialogue) {
            console.log("Choice selected but no ongoing dialogue.");
            return;
        }

        const choice = this.currentDialogue.getChoiceByIndex(choiceNum);
        if (!choice) {
            console.error("Choice index invalid.");
            return;
        }

        if (choice.choiceAction) {
            choice.choiceAction();
        }

        if (choice.nextDialogueId) {
            this.startDialogue(choice.nextDialogueId);
        }
        else {
            this.endCurrentDialogue();
        }
    }

    handleDialogueCommand(line: string) {
        if (line && line.startsWith("%")) {
            const matches = line.match(/%(\w*)%/);
            if (!matches) {
                return false;
            }

            const cmd = matches[1];
            const arglist = line.split("%"+cmd+"%")[1].trim();
            const args = arglist.split(" ");

            switch (cmd.toUpperCase()) {
                case "ANIMATE": {
                    const name = args[0];
                    const t = args[1];
                    const duration = args[2];
                    const target = getEngine().resolve(t);
                    if (target && target instanceof Container) {
                        queueNamedAnimate(target, name, Number.parseFloat(duration));
                    }
                    break;
                }
                case "EXPRESSION": {
                    const npc = this.currentDialogue?.speaker as NPC;
                    const name = args[0];
                    const flip = args[1];
                    npc.changeExpression(name);
                    let x,y = false;
                    if (flip && flip.toUpperCase() === "FLIPXY") {
                        x = true;
                        y = true;
                    }
                    else if (flip && flip.toUpperCase() === "FLIPX") {
                        x = true;
                    }
                    else if (flip && flip.toUpperCase() === "FLIPY") {
                        y = true;
                    }
                    npc.flipBodyPart(1, x, y);
                    break;
                }
                case "POSE": {
                    const npc = this.currentDialogue?.speaker as NPC;
                    const poseName = args[0];
                    const flip = args[1];
                    npc.setPose(poseName);
                    let x,y = false;
                    if (flip && flip.toUpperCase() === "FLIPXY") {
                        x = true;
                        y = true;
                    }
                    else if (flip && flip.toUpperCase() === "FLIPX") {
                        x = true;
                    }
                    else if (flip && flip.toUpperCase() === "FLIPY") {
                        y = true;
                    }
                    npc.flip(x, y);
                    break;
                }
                default: {
                    console.log("Unknown dialogue command");
                }
            }

            return true;
        }

        return false;
    }

    endCurrentDialogue() {
        this.currentDialogue?.speaker.setSpeaking(false);
        this.currentDialogue = undefined;
        this.currentDialogueLine = 0;
        this.dialogueHud.endDialogue();
    }

    getDialogueHud() {
        return this.dialogueHud;
    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === START_DIALOGUE) {
            const startDialogueEvent = engineEvent as StartDialogueEvent;
            this.startDialogue(startDialogueEvent.dialogueId);
        }
        else if (engineEvent.event === ADVANCE_DIALOGUE) {
            this.advanceDialogue();
        }
        else if (engineEvent.event === SELECT_DIALOGUE_CHOICE) {
            const choiceEvent = engineEvent as SelectDialogueChoiceEvent;
            this.handleDialogueChoice(choiceEvent.choice);
        }
    }

    update(time: number): void {
    }

}