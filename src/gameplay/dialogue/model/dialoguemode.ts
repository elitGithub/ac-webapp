export interface DialogueMode {
    inDialogueMode: boolean;

    enterDialogueMode(): void;
    
    exitDialogueMode(): void;
}