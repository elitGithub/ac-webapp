import { Sprite, Texture } from "pixi.js";
import { Scene } from "../scene/models";

export interface BaseEntity {
    name: string;

    onSceneOut(scene: Scene): void;
}

export class RenderableEntity extends Sprite implements BaseEntity {
    name: string;

    constructor(baseTexture?: Texture, name?: string) {
        super(baseTexture);
        this.name = name ?? "";

        this.on("pointerdown", this.onPointerPress.bind(this));
        this.on("pointerup", this.onPointerRelease.bind(this));
        this.on("pointerupoutside", this.onPointerCancel.bind(this));
        this.on("pointercancel", this.onPointerCancel.bind(this));
        this.on("pointertap", this.onPointerClick.bind(this));

        this.on("pointerover", this.onPointerHover.bind(this));
        this.on("pointerout", this.onPointerHoverEnd.bind(this));
    }

    onPointerPress(event: any) {

    }

    onPointerRelease(event: any) {

    }

    onPointerClick(event: any) {

    }

    onPointerCancel(event: any) {

    }

    onPointerHover(event: any) {

    }

    onPointerHoverEnd(event: any) {

    }

    onSceneOut(scene: Scene): void {
    }

}

export class LogicEntity {

}