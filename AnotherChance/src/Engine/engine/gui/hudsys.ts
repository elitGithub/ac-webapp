import { HudElementToggleEvent, TOGGLE_HUD } from ".";
import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent } from "..";
import { RENDER_HUD_CHANGE } from "../render/models";
import { HudElement } from "./models";

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

    toggleElement(name: string, force?: boolean) {
        if (!this.hudElements.has(name)) {
            return;
        }

        const element = this.hudElements.get(name)!;

        if (force !== undefined) {
            if (element.visible === force) {
                return;
            }

            element.visible = force;
        }
        else {
            element.visible = !element.visible;
        }

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
            this.toggleElement((engineEvent as HudElementToggleEvent).hudname, (engineEvent as HudElementToggleEvent).force);
        }
    }

    update(time: number): void {
        if (this.hudChanged) {
            EngineBus.emit(RENDER_HUD_CHANGE, createEngineEvent(RENDER_HUD_CHANGE, {hudElements: this.activeElements()}));
            this.hudChanged = false;
        }
    }

    loadState(data: HudSystem): void {
        if (data.hudElements) {
            for (const [key, h]of data.hudElements.entries()) {
                if (this.hudElements.has(key)) {
                    const hud = this.hudElements.get(key)!;
                    hud.visible = h.visible;
                    this.hudChanged = true;
                }
            }
        }
    }
}
