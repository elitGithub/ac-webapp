import { Container, Sprite } from "pixi.js";
import { IRenderableResource } from "../../../framework/graphics";
import { getEngine } from "../..";
import { LoadedTextureAsset } from "../../assetloader";

export interface IScene {

}

export class Scene extends Container implements IScene {
    name: string;
    background?: Sprite;

    constructor(name: string, baseTexture?: IRenderableResource) {
        super();
        this.name = name;
        this.sortableChildren = true;
        if (baseTexture) {
            getEngine().getAssets().loadTexture(baseTexture)
            .then((texture: LoadedTextureAsset|void) => {
                if (texture) {
                    this.background = Sprite.from(texture.texture);
                    this.background.zIndex = 0;
                    this.background.anchor.set(0.5);
                    const pos = getEngine().SPR(0.5, 0.5);
                    this.background.setTransform(pos.x, pos.y);
                    this.addChild(this.background);
                }
            });    
        }

        this.eventMode = "passive";
    }

    addSceneObject(sceneObject: Container) {
        sceneObject.zIndex = 1;
        this.addChild(sceneObject);
    }

    removeSceneObject(sceneObject: Container) {
        this.removeChild(sceneObject);
    }
}