import { Icon, IconShape } from "../../engine/gui";
import { IRenderableResource } from "../../framework/graphics";

export class DialogueChoice {
    dialogueId: string;
    choice: string;
    icon?: Icon;
    enabled: () => boolean;
    nextDialogueId?: string;
    choiceAction?: Function;

    constructor(dialogueId: string, choice: string, isEnabled?: boolean | (() => boolean), nextDialogue?: string, choiceAction?: Function, icon?: Icon) {
        this.dialogueId = dialogueId;
        if (typeof isEnabled === "boolean") {
            this.enabled = () => isEnabled;
        }
        else if (typeof isEnabled === "function") {
            this.enabled = isEnabled;
        }
        else {
            this.enabled = () => true;
        }
        this.choice = choice;
        this.nextDialogueId = nextDialogue;
        this.choiceAction = choiceAction;
        this.icon = icon;
    }

    setEnabled(isEnabled: boolean | (() => boolean) ) {
        if (typeof isEnabled === "boolean") {
            this.enabled = () => isEnabled;
        }
        else {
            this.enabled = isEnabled;
        }
    }

    addIcon(texture: IRenderableResource, shape: IconShape, size: number) {
        this.icon = new Icon(texture, shape, size);
    }

    setIcon(icon: Icon) {
        this.icon = icon;
    }
}