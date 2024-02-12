import { Container } from "pixi.js";
import { EngineBus, createEngineEvent, getEngine } from "../..";
import { TOGGLE_HUD } from ".";
export class HudElement extends Container {
    draw: boolean;

    constructor(name?: string) {
        super();
        this.name = name ?? "";
        this.draw = false;
        this.eventMode = "dynamic";
        this.on("pointertap", this.onPointerClick.bind(this));
        this.on("pointerupoutside", this.onPointerClickOutside.bind(this));
        this.on("pointerover", this.onPointerOver.bind(this));
        this.on("pointermove", this.onPointerMove.bind(this));
    }

    onPointerClick(event: any) {
        if (getEngine().DEBUG)
        console.log(this.name+" clicked");
    }

    onPointerClickOutside(event: any) {
        EngineBus.emit(TOGGLE_HUD, createEngineEvent(TOGGLE_HUD, {hudname: this.name}));
    }

    onPointerOver(event: any) {
        if (getEngine().DEBUG)
        console.log(this.name+" over");
    }

    onPointerMove(event: any) {
        
    }
}