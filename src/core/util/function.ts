import { DevModGameInterfaceContextFunction, DevModInterface } from "../../modsystem";

export class InvokeContextHandlers {
    handlers: DevModGameInterfaceContextFunction[];

    constructor() {
        this.handlers = [];
    }

    addHandler(handler: DevModGameInterfaceContextFunction) {
        if (!this.handlers.includes(handler)) {
            this.handlers.push(handler);
        }
    }

    removeHandler(handler?: DevModGameInterfaceContextFunction, name?: string) {
        if (name) {
            this.handlers = this.handlers.filter(h => h.name !== name);
            return;
        }

        if (handler) {
            this.handlers = this.handlers.filter(h => h !== handler);
        }
    }

    runHandlers(...args: any) {
        for(let i = 0; i < this.handlers.length; i++) {
            this.handlers[i](DevModInterface.GAME, ...args);
        }
    }

    runNamedHandler(name: string, ...args: any) {
        const handler = this.handlers.find(f => f.name === name);
        if (handler) {
            handler(DevModInterface.GAME, ...args);
        }
    }
}