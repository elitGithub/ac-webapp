import { randomUUID } from "../../core/util";
import { InvokeContextHandlers } from "../../core/util/function";
import { BaseCharacter } from "../../engine/coreentities/basecharacter";
import { DevModGameInterfaceContextFunction } from "../../modsystem";
import { DialogueChoice } from "./dialoguechoice";

/**
 * Dialogue
 * 
 * A single dialogue consists of consecutive text to be displayed to the player and a choice to provide to the player after the consecutive lines have all been read.
 * A dialogue choice can then allow dialogue branching by playing a unique dialogue for the choice.
 * Since there is branching involved, it is helpful that each dialogue has a parent with the dialogue that started it so that a conversation tree can be made.
 */
export class Dialogue {
    dialogueId: string;
    speaker: BaseCharacter;
    lines: Array<string>;
    choices: Array<DialogueChoice>;
    defaultNextDialogueId?: string;
    readonly onDialoguePre: InvokeContextHandlers<DevModGameInterfaceContextFunction>;
    readonly onDialoguePost: InvokeContextHandlers<DevModGameInterfaceContextFunction>;
    readonly namedActions: InvokeContextHandlers<DevModGameInterfaceContextFunction>;
    private category?: string;
    private callerDialogue?: string;

    constructor(speaker: BaseCharacter, dialogueId?: string, defaultNextDialogueId?: string, callerDialogue?: string) {
        if (dialogueId) {
            this.dialogueId = dialogueId;
        }
        else {
            this.dialogueId = `dialogue_${speaker.name}_${randomUUID()}`;
        }

        this.speaker = speaker;
        this.defaultNextDialogueId = defaultNextDialogueId;
        this.callerDialogue = callerDialogue;

        this.lines = [];
        this.choices = [];

        this.onDialoguePre = new InvokeContextHandlers();
        this.onDialoguePost = new InvokeContextHandlers();
        this.namedActions = new InvokeContextHandlers();
    }

    addDialogueLine(...line: string[]) {
        this.lines.push(...line);
    }

    setDialogueLines(lines: string[]) {
        this.lines = lines;
    }

    getCategory() {
        return this.category;
    }
    
    setCategory(category: string) {
        this.category = category;
    }

    setCaller(caller: string) {
        this.callerDialogue = caller;
    }

    getChoiceByIndex(index: number) {
        if (index >= this.choices.length) {
            return null;
        }

        return this.choices[index];
    }

    addChoice(choice: string, nextDialogue?: string, choiceAction?: Function) {
        this.choices.push(new DialogueChoice(this.dialogueId, choice, nextDialogue, choiceAction));
    }

    setChoices(choices: DialogueChoice[]) {
        this.choices = choices;
    }

    addDialogueEventAction(action: DevModGameInterfaceContextFunction, pre?: boolean) {
        if (pre) {
            this.onDialoguePre.addHandler(action, false);
        }
        else {
            this.onDialoguePost.addHandler(action, false);
        }
    }

    removeDialogueEventAction(action: DevModGameInterfaceContextFunction, pre?: boolean) {
        if (pre) {
            this.onDialoguePre.removeHandler(action);
        }
        else {
            this.onDialoguePost.removeHandler(action);
        }
    }

    addNamedAction(action: DevModGameInterfaceContextFunction, name?: string) {
        if (name) {
            Object.defineProperty(action, "name", {...Object.getOwnPropertyDescriptor(action, "name"), value: name});
        }

        this.namedActions.addHandler(action, false);
    }

    removeNamedAction(name: string) {
        this.namedActions.removeHandler(undefined, name);
    }
}