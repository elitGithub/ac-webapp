import mitt, { EventType } from "mitt";

export function createEventBus<T>() {
    return mitt<Record<EventType, T>>();
}
