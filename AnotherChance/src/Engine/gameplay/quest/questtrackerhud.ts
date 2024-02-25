import { Sprite, Text } from "pixi.js";
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
        this.text.text = text;
        if (this.background) {
            this.text.setTransform(this.background.width / 2, this.background.height / 2);
        }
    }

    setFocusedQuest(quest: string) {
        this.focusedQuest = quest;
        this.setText(quest);
    }

    onPointerClick(event: any): void {
        super.onPointerClick(event);
        EngineBus.emit(TOGGLE_HUD, createEngineEvent(TOGGLE_HUD, { hudname: "HUD_QUESTLIST" }));
    }
}