import { IDestroyOptions, Sprite, Texture } from "pixi.js";
import { Scene } from "../scene";
import { getEngine } from "..";

export interface BaseEntity {
    name: string;
    markedForDeletion: boolean;
    deletionOptions: IDestroyOptions;

    onSceneOut(scene: Scene): void;

    destroyEntity(destroyTextures?: boolean): void;
}

export class RenderableEntity extends Sprite implements BaseEntity {
    name: string;
    markedForDeletion: boolean;
    deletionOptions: IDestroyOptions;

    constructor(baseTexture?: Texture, name?: string) {
        super(baseTexture);
        this.name = name ?? "";
        this.markedForDeletion = false;
        this.deletionOptions = {
            children: true,
            texture: false,
            baseTexture: false
        }

        this.on("pointerdown", this.onPointerPress.bind(this));
        this.on("pointerup", this.onPointerRelease.bind(this));
        this.on("pointerupoutside", this.onPointerCancel.bind(this));
        this.on("pointercancel", this.onPointerCancel.bind(this));
        this.on("pointertap", this.onPointerClick.bind(this));

        this.on("pointerover", this.onPointerHover.bind(this));
        this.on("pointerout", this.onPointerHoverEnd.bind(this));

        getEngine().getEnt().addEntityToList(this);
    }

    onPointerPress(event: any) {
        console.log(event);
    }

    onPointerRelease(event: any) {
        console.log(event);
    }

    onPointerClick(event: any) {
        console.log(event);
    }

    onPointerCancel(event: any) {
        console.log(event);
    }

    onPointerHover(event: any) {
        console.log(event);
    }

    onPointerHoverEnd(event: any) {
        console.log(event);
    }

    onSceneOut(scene: Scene): void {
        console.log(scene);
    }

    destroyEntity(destroyTextures?: boolean): void {
        if (destroyTextures) {
            this.deletionOptions.texture = destroyTextures;
            this.deletionOptions.baseTexture = destroyTextures;
        }
        this.markedForDeletion = true;
    }

}
