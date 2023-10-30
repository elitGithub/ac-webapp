import { BLEND_MODES, Container, Sprite, Texture } from "pixi.js";
import { BaseEntity } from "./entity";

export interface BaseInteractableAction {
    action: string,
    handler: Function,
}

export class BaseInteractable extends Sprite implements BaseEntity {
    public name: string;
    public actions: [BaseInteractableAction];
    public canInteract: boolean = true;
    public hoverHighlight = true;

    constructor(baseTexture?: Texture, name?: string, action?: BaseInteractableAction) {
        super(baseTexture);
        this.name = name ?? "";
        this.actions = [{action: "interact", handler: () => {console.log("hi")}}];
        if (action) {
            this.actions.push(action);
        }

        this.on("pointerdown", this.onPointerPress.bind(this));
        this.on("pointerup", this.onPointerRelease.bind(this));
        this.on("pointerupoutside", this.onPointerCancel.bind(this));
        this.on("pointercancel", this.onPointerCancel.bind(this));
        this.on("pointertap", this.onPointerClick.bind(this));

        this.on("pointerover", this.onPointerHover.bind(this));
        this.on("pointerout", this.onPointerHoverEnd.bind(this));

        this.eventMode = "dynamic";
    }

    onPointerPress(event: any) {

    }

    onPointerRelease(event: any) {
        if (!this.canInteract) {
            return;
        }

        const deleteActions = [];
        for (let i = 0; i < this.actions.length; i++) {
            const biAction = this.actions[i];
            if (biAction.action !== "interact") {
                continue;
            }

            if (biAction.handler) {
                biAction.handler(this);
            }
            else {
                deleteActions.push(i);
            }
        }

        for (let i = 0; i < deleteActions.length; i++) {
            this.actions.splice(deleteActions[i], 1);
        }
    }

    onPointerClick(event: any) {

    }

    onPointerCancel(event: any) {

    }

    onPointerHover(event: any) {
        if (this.hoverHighlight)
        {
            //Should probably save the state of the blendmode so we can revert back to it in case the blendmode was not normal.
            this.blendMode = BLEND_MODES.SCREEN;
        }
    }

    onPointerHoverEnd(event: any) {
        this.blendMode = BLEND_MODES.NORMAL;
    }
}