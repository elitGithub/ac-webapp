import { Container } from "pixi.js";
import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent } from "..";
import { RENDER_HUD_CHANGE } from "../render/models";

export class HudSystem implements EngineSystem {

    hudElements: Map<string, HudElement>;
    hudChanged: boolean;

    constructor() {
        this.hudElements = new Map<string, HudElement>();
        this.hudChanged = false;
    }

    addElementToHud(name: string, hudElement: HudElement) {
        if (!this.hudElements.has(name)) {
            this.hudElements.set(name, hudElement);
            this.hudChanged = true;
        }
    }

    removeElement(name: string) {
        this.hudElements.delete(name);
        this.hudChanged = true;
    }

    queue(engineEvent: IEngineEvent): void {
        throw new Error("Method not implemented.");
    }

    update(time: number): void {
        if (this.hudChanged) {
            EngineBus.emit(RENDER_HUD_CHANGE, createEngineEvent(RENDER_HUD_CHANGE, {hudElements: Array.from(this.hudElements.values())}));
            this.hudChanged = false;
        }
    }

}

export class HudElement extends Container {
    
}