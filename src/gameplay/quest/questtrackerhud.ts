import { Sprite, Text, TextMetrics } from "pixi.js";
import { EngineBus, createEngineEvent, getEngine } from "../../engine";
import { HudElement, TOGGLE_HUD } from "../../engine/gui";
import { IRenderableResource } from "../../framework/graphics";

export class QuestTrackerHud extends HudElement {
    background?: Sprite;
    text: Text;
    focusedQuest: string;

    constructor(backgroundTexture?: IRenderableResource) {
        super();
        if (backgroundTexture) {
            this.setBackground(backgroundTexture);
        }

        this.text = new Text();
        this.text.anchor.set(0.5);
        
        this.addChild(this.text);
        this.focusedQuest = "";
    }

    setBackground(background: IRenderableResource) {
        getEngine().createSimpleSprite(background)
            .then(sprite => {
                if (sprite) {
                    this.background = sprite;
                    this.addChildAt(this.background, 0);
                }
            });
    }

    setText(text: string) {
        const textMetric = TextMetrics.measureText(text, this.text.style);
        this.text.text = text;
        if (this.background) {
            this.text.setTransform((textMetric.width + this.background.width) / 4, 10);
        }
        else {
            this.setTransform(textMetric.width / 2, 10);
        }
    }

    setFocusedQuest(quest: string) {
        this.focusedQuest = quest;
        this.setText(quest);
    }

    onPointerClick(event: any): void {
        EngineBus.emit(TOGGLE_HUD, createEngineEvent(TOGGLE_HUD, { hudname: "HUD_QUEST_LIST" }));
    }
}