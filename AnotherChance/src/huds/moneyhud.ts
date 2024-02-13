import { Sprite, Text } from "pixi.js";
import { getEngine } from "../../../src/engine";
import { HudElement } from "../../../src/engine/gui";
import MoneyIcon from "./../assets/ui/hud/icon_money.webp";

export class MoneyHudElement extends HudElement {
    icon!: Sprite;
    text: Text;

    constructor() {
        super();
        getEngine().createSimpleSprite({source: MoneyIcon})
        .then((sprite) => {
            if (sprite) {
                this.icon = sprite;
                this.addChild(this.icon);
            }
        });
        this.text = new Text();
        this.text.x = 60;
        this.text.y = 10;
        this.addChild(this.text);
    }

    setMoney(value: number) {
        this.text.text = `${value}`;
    }
}