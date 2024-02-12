import { DisplayObject } from "pixi.js";
import { Scene } from "../../engine/scene/models";
import { callPropagate } from "./callPropagate";

export function onSceneOutChildren(ents: DisplayObject[], scene: Scene) {
    callPropagate(ents, "onSceneOut", scene);
}
