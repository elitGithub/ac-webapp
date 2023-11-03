import { Scene } from "../scene/models";

export interface BaseEntity {
    name: string;

    onSceneOut(scene: Scene): void;
}