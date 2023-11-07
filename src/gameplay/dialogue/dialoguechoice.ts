export class DialogueChoice {
    dialogueId: string;
    choice: string;
    nextDialogueId?: string;
    choiceAction?: Function;

    constructor(dialogueId: string, choice: string, nextDialogue?: string, choiceAction?: Function) {
        this.dialogueId = dialogueId;
        this.choice = choice;
        this.nextDialogueId = nextDialogue;
        this.choiceAction = choiceAction;
    }
}