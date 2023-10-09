import { createEventBus } from "../framework/events";
import { InputSystem } from "./input";
import { RenderSystem } from "./render/rendersys";
import { AnimationSystem } from "./rendereffects";
import { SceneSystem } from "./scene/scenesys";
import { utils } from "pixi.js";

export type IEngineEvent = {
    eventId: string;
}

export function createEngineEvent(eventData: Object): IEngineEvent {
    eventData[eventId] = crypto.randomUUID();
    return eventData as IEngineEvent;
}

export interface EngineSystem {
    queue(engineEvent: IEngineEvent): void;
    update(time: number): void;
}

export const EngineBus = createEventBus<IEngineEvent>();

export class Engine {
    static Render: EngineSystem;
    static Animation: EngineSystem;
    static Scene: EngineSystem;
    static Input: EngineSystem;

    static defaultConfig = {
        render: {
            renderer: {
                width: 720,
                height: 480,
                resolution: 1,
                gpu: true,
                mobile: utils.isMobile.any,
            },
        }
    };

    static {
        Engine.Render = new RenderSystem(Engine.defaultConfig);
        Engine.Animation = new AnimationSystem();
        Engine.Scene = new SceneSystem();
        Engine.Input = new InputSystem();
    }
}