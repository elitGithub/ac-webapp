import { createEventBus } from "../framework/events";

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