import { IEngineEvent } from "../../enginesys";

export interface AnimationListener {
    onAnimationsFinish(event: IEngineEvent, name?: string): void;
}
