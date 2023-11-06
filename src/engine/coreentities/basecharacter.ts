import { Texture } from "pixi.js";
import { BaseInteractable, BaseInteractableAction } from ".";

export class BaseCharacter extends BaseInteractable {
    constructor(displayName: string, defaultTexture?: Texture, action?: BaseInteractableAction) {
        super(defaultTexture, displayName, action);
    }
}