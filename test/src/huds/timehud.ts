import { Sprite, Text } from "pixi.js";
import { getEngine } from "../../../src/engine";
import { HudElement } from "../../../src/engine/gui";
import TimeButton from "./../assets/ui/hud/btn_time.webp";

export class TimeHudElement extends HudElement {
    icon!: Sprite;
    text: Text;

    constructor() {
        super();
        getEngine().createSimpleSprite({source: TimeButton})
        .then(sprite => {
            if (sprite) {
                this.icon = sprite;
                this.addChild(this.icon, this.text);
            }
        });

        this.text = new Text();
        this.text.x = 25;
        this.text.y = 10;
        this.text.scale.set(0.75);
    }

    setTime(value: string) {
        this.text.text = value;
    }
}