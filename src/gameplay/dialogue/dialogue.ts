import { BaseCharacter } from "../../engine/coreentities/basecharacter";
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
    private callerDialogue?: string;

    constructor(speaker: BaseCharacter, dialogueId?: string, callerDialogue?: string) {
        if (dialogueId) {
            this.dialogueId = dialogueId;
        }
        else {
            this.dialogueId = `dialogue_${speaker.name}_${crypto.randomUUID()}`;
        }

        this.speaker = speaker;
        this.callerDialogue = callerDialogue;

        this.lines = [];
        this.choices = [];
    }

    addDialogueLine(...line: string[]) {
        this.lines.push(...line);
    }

    setDialogueLines(lines: string[]) {
        this.lines = lines;
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
}