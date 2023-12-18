import { Sprite, Text } from "pixi.js";
import { HudElement } from "../../engine/gui";
import { IRenderableResource } from "../../framework/graphics";
import { getEngine } from "../../engine";

export class DialogueHud extends HudElement {
    speakerLabelBg?: Sprite;
    nextIndicatorIcon?: Sprite;
    speechBg?: Sprite;
    dialogueLine: string;
    dialogueSpeaker: string;
    dialogueText: Text;
    speakerText: Text;

    constructor(speechBackground?: IRenderableResource, nextIndicator?: IRenderableResource, speakerLabelBackground?: IRenderableResource) {
        super();
        if (speechBackground) {
            getEngine().createSimpleSprite(speechBackground)
            .then(sprite => {
                if (sprite) {
                    this.setSpeechBackground(sprite);
                }
            });
        }

        if (nextIndicator) {
            getEngine().createSimpleSprite(nextIndicator)
            .then(sprite => this.nextIndicatorIcon = sprite);
        }

        if (speakerLabelBackground) {
            getEngine().createSimpleSprite(speakerLabelBackground)
            .then(sprite => this.speakerLabelBg = sprite);
        }

        this.dialogueLine = "";
        this.dialogueSpeaker = "";
        this.dialogueText = new Text();
        this.speakerText = new Text();
    }

    setSpeakerLabelBackground(sprite: Sprite) {
        this.speakerLabelBg = sprite;
        this.speakerLabelBg.setTransform(0, getEngine().getRender().getDimensions().y - (this.speechBg?.height??0) + 10);
    }

    setNextIndicatorIcon(sprite: Sprite) {
        this.nextIndicatorIcon = sprite;
    }

    setSpeechBackground(sprite: Sprite) {
        this.speechBg = sprite;
        this.speechBg.setTransform(0, getEngine().getRender().getDimensions().y-this.speechBg.height);
        this.speechBg.visible = false;
        this.addChildAt(this.speechBg, 0);
    }

    setSpeaker(speaker: string) {
        this.dialogueSpeaker = speaker;
        this.speakerText.text = speaker;

        if (this.speakerLabelBg) {
            this.speakerText.setTransform(5, getEngine().getRender().getDimensions().y - (this.speechBg?.height??0) + 10);
        }
    }

    setText(text: string) {
        this.dialogueLine = text;
        this.dialogueText.text = text;

        if (this.speechBg) {
            this.dialogueText.setTransform(0, getEngine().getRender().getDimensions().y-this.speechBg.height);
        }
    }

    startDialogue(text: string, speaker: string, next: boolean, choices?: string[]) {
        if (this.speechBg) {
            this.speechBg.visible = true;
        }

        this.setText(text);
        this.setSpeaker(speaker);
        
        if (next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = true;
        }
    }

    nextDialogueLine(text: string, next: boolean, choices?: string[]) {
        this.setText(text);
        if (next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = true;
        }
        else if (!next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = false;
        }
    }

    displayChoices(choices: string[]) {
        
    }

    endDialogue() {
        if (this.speechBg) {
            this.speechBg.visible = false;
        }

        this.setText("");
        this.setSpeaker("");

        if (this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = false;
        }
    }

}