import { createEventBus } from "../framework/events";
import { IRenderableResource } from "../framework/graphics";
import { BaseGame } from "../gameplay/game";
import { AssetSystem } from "./assetloader";
import { BaseInteractable, BaseInteractableAction } from "./coreentities";
import { Location } from "./coreentities/location";
import { HudSystem } from "./gui";
import { InputSystem } from "./input";
import { RenderSystem } from "./render/rendersys";
import { AnimationSystem } from "./rendereffects";
import { Scene } from "./scene/models";
import { SceneSystem } from "./scene/scenesys";
import { Sprite, Ticker, utils } from "pixi.js";

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
    static Game: EngineSystem;
    static Hud: EngineSystem;

    static ticker: Ticker;

    static defaultConfig = {
        render: {
            renderer: {
                width: 1920,
                height: 1080,
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
        Engine.Hud = new HudSystem();
    }

    static init(game: EngineSystem) {
        Engine.Game = game;
        getEngine().getAnimation().subscribeToAnimationEvents(getEngine().getScene());
        Engine.loop(performance.now());
    }

    static loop(dt: DOMHighResTimeStamp) {
        Engine.ticker.update(dt);
       
        Engine.Input.update(dt);
        Engine.Scene.update(dt);
        Engine.Animation.update(dt);
        Engine.Render.update(dt);
        Engine.Game.update(dt);
        Engine.Hud.update(dt);

        requestAnimationFrame(Engine.loop);
    }

    static async createSimpleInteractable(name: string, action: BaseInteractableAction, texture: IRenderableResource) {
        const asset = await getEngine().getAssets().loadTexture(texture);
        const interactable = new BaseInteractable(asset?.texture, name, action);

        return interactable;
    }

    static async createSimpleSceneInteractable(name: string, action: BaseInteractableAction, texture: IRenderableResource, attach: Scene) {
        const interactable = await getEngine().createSimpleInteractable(name, action, texture);
        if (attach) {
            attach.addSceneObject(interactable);
        }
        return interactable;
    }

    static async createSimpleSprite(texture: IRenderableResource) {
        const asset = await getEngine().getAssets().loadTexture(texture);
        if (asset) {
            return Sprite.from(asset.texture);
        }
    }

    static screenPositionByRatio(xRatio: number, yRatio: number) {
       return getEngine().getRender().screenPositionByRatio(xRatio, yRatio);
    }

    static resolve(resolvable: string) {
        const parts = resolvable.split(":");
        if (parts.length === 0) {
            return;
        }

        switch(parts[0]) {
            case "HUD": {
                return (Engine.Hud as HudSystem).activeElements().find(e => e.name === parts[1]);
            }
            case "ENTITY": {
                return (Engine.Game as BaseGame).gameEntities.find(e => e.name === parts[1]);
            }
            case "LOCATION": {
                return (Engine.Scene as SceneSystem).sceneByName(parts[1]) as Location;
            }
        }
    }
}

export function getEngine() {
    return {
        getRender: () => Engine.Render as RenderSystem,
        getAssets: () => Engine.Assets as AssetSystem,
        getAnimation: () => Engine.Animation as AnimationSystem,
        getScene: () => Engine.Scene as SceneSystem,
        getGame: () => Engine.Game as BaseGame,
        getHud: () => Engine.Hud as HudSystem,
        createSimpleInteractable: Engine.createSimpleInteractable,
        createSimpleSceneInteractable: Engine.createSimpleSceneInteractable,
        createSimpleSprite: Engine.createSimpleSprite,
        SPR: Engine.screenPositionByRatio,
        resolve: Engine.resolve,
    };
}