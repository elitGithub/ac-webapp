import { IRenderableResource } from "../../framework/graphics";
import { Scene } from "../scene/models";
import { LocationNode } from "./locationnode";

export class Location extends Scene {

    locationNodes: Array<LocationNode>

    constructor(name: string, texture?: IRenderableResource) {
        super(name, texture);
        this.locationNodes = [];
    }
    
    addLocationNode(locationNode: LocationNode) {
        this.locationNodes.push(locationNode);
    }
}