import { Texture } from "pixi.js";
import { BaseInteractable, BaseInteractableAction } from ".";

export class LocationNode extends BaseInteractable {
    location: string;
    hintEnabled: boolean;

    constructor(location: string, texture?: Texture, name?: string, action?: BaseInteractableAction) {
        super(texture, name, action);
        this.location = location;
        this.hintEnabled = false;
    }

    static fromInteractable(interactable: BaseInteractable, location: string) {
        const locationNode = (interactable as LocationNode)["location"] = location;
        return locationNode;
    }

    toggleHint() {
        if (this.hintEnabled) {

        }
        else {
            
        }
    }
}