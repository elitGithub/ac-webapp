import { Container, FederatedPointerEvent, Sprite, Texture } from "pixi.js";
import { LayeredRenderable } from "../../render/models/layeredrenderable";
import { IRenderableResource } from "../../../framework/graphics/interfaces/irenderableresource";
import AssetLoader from "../../../framework/loader/AssetLoader";
import { KeyboardListener } from "../../input/keyboardlistener";

export class Scene extends Container {
    background: Sprite;
    sceneChildren: Container[];

    constructor(baseTexture: IRenderableResource) {
        super();
        this.background = Sprite.from(AssetLoader.load(baseTexture) as Texture);
        this.background.zIndex = 0;
        this.addChild(this.background);

        this.eventMode = "passive";
    }

    onClick(click: FederatedPointerEvent) {

    }
}