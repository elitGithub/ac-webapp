import { Container, FederatedEvent, Sprite, Text, TextMetrics } from "pixi.js";
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
    choiceDisplaying: boolean;

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
        this.choiceDisplaying = false;

        this.addChild(this.dialogueText);
    }

    setSpeakerLabelBackground(sprite: Sprite) {
        this.speakerLabelBg = sprite;
        this.speakerLabelBg.setTransform(0, getEngine().getRender().getDimensions().y - (this.speechBg?.height??0) + 10);
        this.addChild(this.speakerLabelBg);
        this.addChild(this.speakerText);
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
            this.speakerText.setTransform(10, getEngine().getRender().getDimensions().y - (this.speechBg?.height??0) + 10);
        }
    }

    setText(text: string) {
        this.dialogueLine = text;
        this.dialogueText.text = text;

        if (this.speechBg) {
            this.dialogueText.setTransform(40, getEngine().getRender().getDimensions().y-this.speechBg.height);
        }
    }

    addChoice(choice: string, order: number) {
        const t = new Text(choice);
        t.anchor.set(0.5);
        const bg = new Sprite(this.choiceBg?.texture);
        const item = new Container();
        t.setTransform(bg.width / 2, bg.height / 2);
        item.addChild(bg, t);
        item.setTransform(getEngine().getRender().getDimensions().x/2, (this.preppedChoices.length * bg.height) + 200);
        item.pivot.set(item.width/2, 0);
        this.preppedChoices.push(item);
        item.eventMode = "dynamic";
        item.on("pointertap", this.onItemClick.bind(this, order));
    }

    clearChoices() {
        this.removeChild(...this.preppedChoices);
        this.preppedChoices = [];
        this.choiceDisplaying = false;
    }

    startDialogue(text: string, speaker: string, next: boolean) {
        if (this.speechBg) {
            this.speechBg.visible = true;
        }

        this.setText(text);
        this.setSpeaker(speaker);

        if (next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = true;
        }
    }

    nextDialogueLine(text: string, next: boolean) {
        this.setText(text);
        
        if (next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = true;
        }
        else if (!next && this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = false;
        }
    }

    prepChoices(choices: string[]) {
        for (let i = 0; i < choices.length; i++) {
            this.addChoice(choices[i], i);
        }
    }

    displayChoices() {
        if (this.choiceDisplaying) {
            return;
        }

        for (let i = 0; i < this.preppedChoices.length; i++) {
            this.addChild(this.preppedChoices[i]);
        }

        this.choiceDisplaying = true;
    }

    endDialogue() {
        if (this.speechBg) {
            this.speechBg.visible = false;
        }

        this.setText("");
        this.setSpeaker("");
        this.clearChoices();

        if (this.nextIndicatorIcon) {
            this.nextIndicatorIcon.visible = false;
        }
    }

    onPointerClick(event: FederatedEvent): void {
        super.onPointerClick(event);
        if (event.target !== this) {
            event.stopImmediatePropagation();
            return;
        }
        if (!this.choiceDisplaying) {
            EngineBus.emit(ADVANCE_DIALOGUE, createEngineEvent(ADVANCE_DIALOGUE, {}));
        }   
    }

    onItemClick(choiceNum: number) {
        EngineBus.emit(SELECT_DIALOGUE_CHOICE, createEngineEvent(SELECT_DIALOGUE_CHOICE, {choice: choiceNum}));
    }
}