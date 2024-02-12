import { Container, Graphics, Sprite } from "pixi.js";
import { IRenderableResource } from "../../../framework/graphics";
import { getEngine } from "../..";

export enum IconShape {
    SQUARE,
    CIRCLE,
}

export class Icon extends Container {

    sprite?: Sprite;

    constructor(texture: IRenderableResource, shape: IconShape, size: number = 100) {
        super();
        getEngine().createSimpleSprite(texture)
            .then(sprite => {
                if (sprite) {
                    this.sprite = sprite;
                    this.addChild(this.sprite);
                }
            });

        let mask = new Graphics();
        mask.beginFill(0xffffff);
        if (shape === IconShape.SQUARE) {    
            mask.drawRect(0, 0, size, size);
        }
        else if (shape === IconShape.CIRCLE) {
            mask.drawCircle(size/2, size/2, size/2);
        }
        mask.endFill();
        this.mask = mask;
        this.addChild(mask);
    }
    
}