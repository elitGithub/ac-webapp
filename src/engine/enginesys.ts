import { createEventBus } from "../framework/events";
import { AssetSystem } from "./assetloader";
import { InputSystem } from "./input";
import { RenderSystem } from "./render/rendersys";
import { AnimationSystem } from "./rendereffects";
import { SceneSystem } from "./scene/scenesys";
import { Ticker, utils } from "pixi.js";

export type IEngineEvent = {
    eventId: string;
    event: Symbol;
}

export function createEngineEvent(event: Symbol, eventData: Object): IEngineEvent {
    /* eventData["eventId"] = crypto.randomUUID();
    eventData["event"] = event; */
    return {event, eventId: crypto.randomUUID(), ...eventData} as IEngineEvent;
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
    static Assets: EngineSystem;

    static ticker: Ticker;

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
        this.ticker = Ticker.shared;
        this.ticker.stop();
        this.ticker.autoStart = false;

        Engine.Render = new RenderSystem(Engine.defaultConfig);
        Engine.Animation = new AnimationSystem();
        Engine.Scene = new SceneSystem();
        Engine.Input = new InputSystem();
        Engine.Assets = new AssetSystem();
    }

    static init() {
        getEngine().getAnimation().subscribeToAnimationEvents(getEngine().getScene());
        Engine.loop(performance.now());
    }

    static loop(dt: DOMHighResTimeStamp) {
        Engine.ticker.update(dt);
       
        Engine.Input.update(dt);
        Engine.Scene.update(dt);
        Engine.Animation.update(dt);
        Engine.Render.update(dt);

        requestAnimationFrame(Engine.loop);
    }
}

export function getEngine() {
    return {
        getRender: () => Engine.Render as RenderSystem,
        getAssets: () => Engine.Assets as AssetSystem,
        getAnimation: () => Engine.Animation as AnimationSystem,
        getScene: () => Engine.Scene as SceneSystem,
    };
}