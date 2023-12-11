import { Sprite, Texture } from "pixi.js";
import { Scene } from "../scene/models";
import { getEngine } from "..";

export interface BaseEntity {
    name: string;

    onSceneOut(scene: Scene): void;
}

export class RenderableEntity extends Sprite implements BaseEntity {
    name: string;

    constructor(baseTexture?: Texture, name?: string) {
        super(baseTexture);
        this.name = name ?? "";

        this.on("pointerdown", this.onPointerPress);
        this.on("pointerup", this.onPointerRelease);
        this.on("pointerupoutside", this.onPointerCancel);
        this.on("pointercancel", this.onPointerCancel);
        this.on("pointertap", this.onPointerClick);

        this.on("pointerover", this.onPointerHover);
        this.on("pointerout", this.onPointerHoverEnd);

        getEngine().getGame().gameEntities.push(this);
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