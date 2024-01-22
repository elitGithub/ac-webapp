import { EngineBus, IEngineEvent } from "../..";

export const Prep_Scenes = Symbol("PREPARE_SCENES");
export const Load_Scene = Symbol("SCENE_LOAD");
export const Transition_Scene = Symbol("SCENE_LOAD_WITH_TRANSITION");
export const Reload_Scene = Symbol("SCENE_RELOAD");

export const SCENE_CHANGED = Symbol("SCENE_CHANGED");
export const SCENE_TRANSITIONED = Symbol("SCENE_TRANSITIONED");

export interface SceneChangeEvent extends IEngineEvent {
    scene: string;
    previousScene?: string;
}

export interface SceneListener {
    onSceneChanged(sceneChange: IEngineEvent): void;
    onSceneTransitioned(sceneChange: IEngineEvent): void;
}

export function subscribeToSceneEvents(listener: SceneListener) {
    EngineBus.on(SCENE_CHANGED, listener.onSceneChanged.bind(listener));
    EngineBus.on(SCENE_TRANSITIONED, listener.onSceneTransitioned.bind(listener));
}