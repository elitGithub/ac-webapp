import { Sprite } from "pixi.js";
import { HudElement } from "../../engine/gui";
import { IRenderableResource } from "../../framework/graphics";
import { getEngine } from "../../engine";

export class DialogueHud extends HudElement {
    speakerLabelBg?: Sprite;
    nextIndicatorIcon?: Sprite;
    speechBg?: Sprite;
    dialogueLine: string;
    dialogueSpeaker: string;

    constructor(speechBackground?: IRenderableResource, nextIndicator?: IRenderableResource, speakerLabelBackground?: IRenderableResource) {
        super();
        if (speechBackground) {
            getEngine().createSimpleSprite(speechBackground)
            .then(sprite => {
                this.speechBg = sprite;
                if (this.speechBg) {
                    this.speechBg.setTransform(0, getEngine().getRender().getDimensions().y-this.speechBg.height);
                    this.addChildAt(this.speechBg, 0);
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
    }

    setSpeakerLabelBackground(sprite: Sprite) {

    }

    setNextIndicatorIcon(sprite: Sprite) {

    }

    setSpeechBackground(sprite: Sprite) {

    }

    setSpeaker(speaker: string) {

    }

    setText(text: string) {
        this.dialogueLine = text;
    }

}