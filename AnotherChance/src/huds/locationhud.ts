import { Sprite, Text } from "pixi.js";
import { getEngine } from "../../../src/engine";
import { HudElement } from "../../../src/engine/gui";
import LocationButton from "./../assets/ui/hud/btn_map.webp";

export class LocationHudElement extends HudElement {
    icon!: Sprite; 
    text: Text;

    constructor() {
        super();
        getEngine().createSimpleSprite({source: LocationButton})
        .then(sprite => {
            if (sprite) {
                this.icon = sprite;
                this.addChild(this.icon, this.text);
            }
        });

        this.text = new Text();
        this.text.x = 70;
        this.text.y = 10;
        this.text.scale.set(0.75);
    }

    setLocation(value: string) {
        this.text.text = value;
    }
}