export type ContextFunction<T extends Function> = ((context: T, ...args: any) => any);
export type ExecLimit = {runOnce: boolean};

export class InvokeContextHandlers<T extends ContextFunction<any>> {
    handlers: (T&ExecLimit)[];
    context: any;
    constructor(context?: any) {
        this.handlers = [];
        this.context = DefaultInvokeContext;
    }

    addHandler(handler: T, runOnce: boolean) {
        (handler as T&ExecLimit).runOnce = runOnce;
        if (!this.handlers.includes((handler as T&ExecLimit))) {
            this.handlers.push((handler as T&ExecLimit));
        }
    }

    removeHandler(handler?: T, name?: string) {
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
            this.handlers[i](this.context, ...args);
        }

        this.handlers = this.handlers.filter(h => !h.runOnce);
    }

    runNamedHandler(name: string, ...args: any) {
        const handler = this.handlers.find(f => f.name === name);
        if (handler) {
            handler(this.context, ...args);
            if (handler.runOnce) {
                this.handlers = this.handlers.filter(h => h !== handler);
            }
        }
    }
}