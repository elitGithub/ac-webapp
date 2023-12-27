import { HudElementToggleEvent, TOGGLE_HUD } from ".";
import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent } from "..";
import { RENDER_HUD_CHANGE } from "../render/models";
import { HudElement } from "./models/hudelement";

export class HudSystem implements EngineSystem {

    hudElements: Map<string, HudElement>;
    hudChanged: boolean;

    constructor() {
        this.hudElements = new Map<string, HudElement>();
        this.hudChanged = false;

        EngineBus.on(TOGGLE_HUD, this.queue.bind(this));
    }

    addElementToHud(name: string, hudElement: HudElement) {
        if (!this.hudElements.has(name)) {
            hudElement.name = name;
            this.hudElements.set(name, hudElement);
            this.hudChanged = true;
        }
    }

    toggleElement(name: string) {
        if (!this.hudElements.has(name)) {
            return;
        }

        const element = this.hudElements.get(name)!;
        element.visible = !element.visible;
        this.hudChanged = true;
    }

    activeElements() {
        return Array.from(this.hudElements.values()).filter(he => he.visible);
    }

    removeElement(name: string) {
        this.hudElements.delete(name);
        this.hudChanged = true;
    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === TOGGLE_HUD) {
            this.toggleElement((engineEvent as HudElementToggleEvent).hudname);
        }
    }

    update(time: number): void {
        if (this.hudChanged) {
            EngineBus.emit(RENDER_HUD_CHANGE, createEngineEvent(RENDER_HUD_CHANGE, {hudElements: this.activeElements()}));
            this.hudChanged = false;
        }
    }

}
