import { getEngine } from "..";
import { IRenderableResource } from "../../framework/graphics";
import { Scene } from "../scene";
import { LocationNode } from "./locationnode";

export class Location extends Scene {

    locationNodes: Array<LocationNode>

    constructor(name: string, texture?: IRenderableResource) {
        super(name, texture);
        this.locationNodes = [];
    }

    addLocationNode(locationNode: LocationNode) {
        this.locationNodes.push(locationNode);
        this.addChild(locationNode);
    }

    connectsTo(to: string, start?: string) {
        if (this.locationNodes.some(ln => ln.location === to)) {
            return true;
        }

        if (!start) {
            start = this.name;
        }

        for(const ln of this.locationNodes) {
            if (ln.location === start) {
                continue;
            }

            const loc = getEngine().getScene().sceneByName(ln.location) as Location;
            if (loc.connectsTo(to)) {
                return true;
            }
        }

        return false;
    }
}
