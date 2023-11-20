import { Sprite, Text, TextMetrics } from "pixi.js";
import { EngineBus, createEngineEvent, getEngine } from "../../engine";
import { HudElement, TOGGLE_HUD } from "../../engine/gui";
import { IRenderableResource } from "../../framework/graphics";

export class QuestTrackerHud extends HudElement {
    background: Sprite;
    text: Text;
    focusedQuest: string;

    constructor(backgroundTexture: IRenderableResource) {
        super();
        getEngine().createSimpleSprite(backgroundTexture)
        .then(sprite => {
            if (sprite) {
                this.background = sprite;
                this.addChild(this.background);
                this.addChild(this.text);
            }
        });

        this.text = new Text();
        this.text.anchor.set(0.5);

        this.focusedQuest = "";
    }

    setText(text: string) {
        const textMetric = TextMetrics.measureText(text, this.text.style);
        this.text.text = text;
        this.text.setTransform((textMetric.width+this.background.width)/4, 10);
    }

    setFocusedQuest(quest: string) {
        this.focusedQuest = quest;
        this.setText(quest);
    }

    onPointerClick(event: any): void {
        EngineBus.emit(TOGGLE_HUD, createEngineEvent(TOGGLE_HUD, {hudname: "HUD_QUEST_LIST"}));
    }
}