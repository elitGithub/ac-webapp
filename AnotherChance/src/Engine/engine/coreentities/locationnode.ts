import { Texture } from "pixi.js";
import { BaseInteractable, BaseInteractableAction } from ".";

export class LocationNode extends BaseInteractable {
    location: string;

    constructor(location: string, texture: Texture, name: string, action: BaseInteractableAction) {
        super(texture, name, action);
        this.location = location;
    }

    static fromInteractable(interactable: BaseInteractable, location: string) {
        return (interactable as LocationNode)["location"] = location;
    }
}
