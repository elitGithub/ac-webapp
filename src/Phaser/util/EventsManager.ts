import { EventCallback } from '../types/types';

interface EventListener {
    callback: EventCallback;
    context: any;
}

export default class EventsManager {
    private readonly listeners: Record<string, EventListener[]>;
    private static instance: EventsManager | undefined;
    static getInstance() {
        if (!(EventsManager.instance instanceof EventsManager) || typeof EventsManager.instance === 'undefined') {
            EventsManager.instance = new EventsManager();
        }
        return EventsManager.instance;
    }
    private constructor() {
        this.listeners = {};
    }

    on(event: string, callback: EventCallback, context: any) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push({ callback, context });
    }

    off(event: string, callback: EventCallback, context: any) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener.callback !== callback || listener.context !== context
        );
    }

    emit(event: string, ...args: any[]) {
        console.log(event);
        if (!this.listeners[event]) {
            console.log('NOT IN LISTENRES', event);
            return;
        }
        this.listeners[event].forEach((listener) => {
            listener.callback.apply(listener.context, args);
        });
    }
}
