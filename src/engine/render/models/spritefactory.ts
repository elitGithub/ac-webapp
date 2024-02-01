import { Sprite } from "pixi.js";
import { Cloneable } from ".";

export class SpriteFactory extends Sprite implements Cloneable<SpriteFactory> {
    clone() {
        return new SpriteFactory(this.texture.clone());
    }

    static ToSpriteFactory(sprite: Sprite): SpriteFactory {
        return Object.setPrototypeOf(sprite, SpriteFactory.prototype);
    }
}