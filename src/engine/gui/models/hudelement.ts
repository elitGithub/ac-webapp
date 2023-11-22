import { Container } from "pixi.js";
import { EngineBus, createEngineEvent } from "../..";
import { TOGGLE_HUD } from ".";
export class HudElement extends Container {
    draw: boolean;

    constructor() {
        super();
        this.draw = false;
        this.on("pointertap", this.onPointerClick.bind(this));
        this.on("pointerupoutside", this.onPointerClickOutside.bind(this));
    }

    onPointerClick(event: any) {

    }

    onPointerClickOutside(event: any) {
        EngineBus.emit(TOGGLE_HUD, createEngineEvent(TOGGLE_HUD, {hudname: this.name}));
    }
}