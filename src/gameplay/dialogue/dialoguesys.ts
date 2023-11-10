import { Dialogue } from ".";
import { EngineBus, EngineSystem, IEngineEvent, getEngine } from "../../engine";
import { DialogueHud } from "./dialoguehud";
import { ADVANCE_DIALOGUE, SELECT_DIALOGUE_CHOICE, START_DIALOGUE, SelectDialogueChoiceEvent, StartDialogueEvent } from "./model";

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

    constructor() {
        EngineBus.on(START_DIALOGUE, this.queue.bind(this));
        EngineBus.on(ADVANCE_DIALOGUE, this.queue.bind(this));
        EngineBus.on(SELECT_DIALOGUE_CHOICE, this.queue.bind(this));

        this.dialogueCatalogs = new Map<string, DialogueCatalog>();
        this.currentDialogueLine = 0;
        this.dialogueHud = new DialogueHud();
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
        const hasNext = (this.currentDialogue.lines.length - this.currentDialogueLine) > 1;
        this.dialogueHud.startDialogue(dialogue.lines[this.currentDialogueLine], dialogue.speaker.name, hasNext, hasNext ? undefined : dialogue.choices.map(c => c.choice));
    }

    startDialogue(dialogueId: string, category?: string) {
        if (category) {
            const cat = this.dialogueCatalogs.get(category);
            if (!cat) {
                console.error("Could not find category "+category);
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
        if (this.currentDialogueLine >= this.currentDialogue.lines.length) {
            this.endCurrentDialogue();
            return;
        }

        const hasNext = (this.currentDialogue.lines.length - this.currentDialogueLine) > 1;
        this.dialogueHud.nextDialogueLine(this.currentDialogue.lines[this.currentDialogueLine], hasNext, hasNext ? undefined : this.currentDialogue.choices.map(c => c.choice));
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

    endCurrentDialogue() {
        this.currentDialogue = undefined;
        this.currentDialogueLine = 0;
        this.dialogueHud.endDialogue();
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
        throw new Error("Method not implemented.");
    }

}