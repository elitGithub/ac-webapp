import { Container, Sprite, Texture } from "pixi.js";
import { IRenderableResource } from "../../../framework/graphics/interfaces/irenderableresource";
import AssetLoader from "../../../framework/loader/AssetLoader";

export interface IScene {

}

export class Scene extends Container implements IScene {
    name: string;
    background?: Sprite;

    constructor(name: string, baseTexture?: IRenderableResource) {
        super();
        this.name = name;
        if (baseTexture) {
             this.background = Sprite.from(AssetLoader.load(baseTexture) as Texture);
             this.background.zIndex = 0;
             this.addChild(this.background);
        }

        this.eventMode = "passive";
    }
}