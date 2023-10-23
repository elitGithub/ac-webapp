import { Container, Sprite, Texture } from "pixi.js";
import { IRenderableResource } from "../../../framework/graphics/interfaces/irenderableresource";
import { getEngine } from "../..";
import { LoadedAsset } from "../../assetloader";

export interface IScene {

}

export class Scene extends Container implements IScene {
    name: string;
    background?: Sprite;

    constructor(name: string, baseTexture?: IRenderableResource) {
        super();
        this.name = name;
        if (baseTexture) {
            getEngine().getAssets().load(baseTexture)
            .then((texture: LoadedAsset|void) => {
                if (texture) {
                    this.background = Sprite.from(texture.texture);
                    this.background.zIndex = 0;
                    this.background.anchor.set(0.5, 0.5);
                    this.background.setTransform(720/2, 480/2, 0.5, 0.5);
                    this.addChild(this.background);
                }
            });    
        }

        this.eventMode = "passive";
    }
}