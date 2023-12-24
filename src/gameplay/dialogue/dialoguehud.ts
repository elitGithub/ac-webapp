import { Container, Sprite, Text, TextMetrics } from "pixi.js";
import { HudElement } from "../../engine/gui";
import { IRenderableResource } from "../../framework/graphics";
import { EngineBus, createEngineEvent, getEngine } from "../../engine";
import { ADVANCE_DIALOGUE, SELECT_DIALOGUE_CHOICE } from ".";

export class DialogueHud extends HudElement {
    speakerLabelBg?: Sprite;
    nextIndicatorIcon?: Sprite;
    speechBg?: Sprite;
    dialogueLine: string;
    dialogueSpeaker: string;
    dialogueText: Text;
    speakerText: Text;
    choiceBg?: Sprite;
    preppedChoices: Container[];

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
        this.preppedChoices = [];
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

    addChoice(choice: string, order: number) {
        const t = new Text(choice);
        t.anchor.set(0.5);
        const textMetric = TextMetrics.measureText(choice, t.style);
        t.setTransform((textMetric.width + t.width) / 4, 10);
        const bg = this.choiceBg ?? this.speakerLabelBg;
        const item = new Container();
        if (bg) {
            item.addChild(bg, t);
            item.setTransform(getEngine().getRender().getDimensions().x/2, (this.preppedChoices.length * bg.height) + 5);
        }
        else {
            console.log("dialogue choice background missing");
            return;
        }
        this.preppedChoices.push(item);
        item.on("pointertap", this.onItemClick.bind(this, order));
    }

    clearChoices() {
        this.preppedChoices = [];
        this.removeChildren();
    }

    startDialogue(text: string, speaker: string, next: boolean, choices?: string[]) {
        if (this.speechBg) {
            this.speechBg.visible = true;
        }

        this.setText(text);
        this.setSpeaker(speaker);
        
        if (choices && choices.length > 0) {
            this.clearChoices();
            this.prepChoices(choices);
        }

        if (next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = true;
        }
    }

    nextDialogueLine(text: string, next: boolean/*, choices?: string[]*/) {
        this.setText(text);
        
        if (next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = true;
        }
        else if (!next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = false;
        }

        /*if (choices && choices.length > 0) {
            this.clearChoices();
            this.prepChoices(choices);
        }*/
    }

    prepChoices(choices: string[]) {
        for (let i = 0; i < choices.length; i++) {
            this.addChoice(choices[i], i);
        }
    }

    displayChoices() {
        for (let i = 0; i < this.preppedChoices.length; i++) {
            this.addChild(this.preppedChoices[i]);
        }
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

    onPointerClick(event: any): void {
        EngineBus.emit(ADVANCE_DIALOGUE, createEngineEvent(ADVANCE_DIALOGUE, {}));
    }

    onItemClick(choiceNum: number) {
        EngineBus.emit(SELECT_DIALOGUE_CHOICE, createEngineEvent(SELECT_DIALOGUE_CHOICE, {choiceNum}));
    }
}