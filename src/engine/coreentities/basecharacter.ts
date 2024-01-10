import { Texture } from "pixi.js";
import { BaseInteractable, BaseInteractableAction } from ".";
import { getEngine } from "..";

export class BaseCharacter extends BaseInteractable {
    speaking: boolean;
    constructor(displayName: string, defaultTexture?: Texture, action?: BaseInteractableAction) {
        super(defaultTexture, displayName, action);
        this.speaking = false;
    }

    setSpeaking(speaking: boolean) {
        this.speaking = speaking;
        if (speaking) {
            getEngine().getScene().toggleSceneInteractivity(false);
        }
        else {
            getEngine().getScene().toggleSceneInteractivity(true);
        }
    }
}