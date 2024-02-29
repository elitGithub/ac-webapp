import { RenderableEntity } from "./entity.ts";
import { Texture } from "pixi.js";
export class NamedSprite extends RenderableEntity {
    constructor(baseTexture: Texture, name: string) {
        super(baseTexture, name);

        this.eventMode = "passive";
    }

}
