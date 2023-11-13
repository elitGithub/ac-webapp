import { Texture } from "pixi.js";
import { BaseInteractable, BaseInteractableAction } from ".";

export class BaseCharacter extends BaseInteractable {
    speaking: boolean;
    constructor(displayName: string, defaultTexture?: Texture, action?: BaseInteractableAction) {
        super(defaultTexture, displayName, action);
        this.speaking = false;
    }

    setSpeaking(speaking: boolean) {
        this.speaking = speaking;
    }
}