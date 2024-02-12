import { getEngine } from ".";
import { ClassDeserialiser } from "../core/serialisation";
import { Sprite } from "pixi.js";

export const SpriteDeserialiser: ClassDeserialiser = {
    serialisedClassAlias: Sprite.name,
    class: Sprite,
};