import { getEngine } from "../Engine/engine";
import { HudElement } from "../Engine/engine/gui";
import { Text } from "pixi.js";
import bg from "./../assets/ui/notification/message_bg.webp"

export class SaveButton extends HudElement {

    text: Text;
    constructor() {
        super()
        getEngine().createSimpleSprite({ source: bg })
            .then(sprite => {
                if (sprite) {
                    this.addChild(this.text);
                    this.text.setTransform(sprite.width/2, sprite.height/2);
                }
            });

        this.text = new Text("Save");
        this.text.anchor.set(0.5);
    }

    onPointerClick(event: any): void {
        super.onPointerClick(event);
        // @ts-ignore
        globalThis.twssave = getEngine().save();
    }
}
