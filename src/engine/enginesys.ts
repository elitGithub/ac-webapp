import { createEventBus } from "../framework/events";

export type IEngineEvent = {

}

export interface EngineSystem {
    queue(engineEvent: IEngineEvent): void;
    update(time: number): void;
}

export const EngineBus = createEventBus<IEngineEvent>();