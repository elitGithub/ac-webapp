import { randomUUID } from "../util";
import { getRef, isRef } from "./util";

export class SerialisedObjectStack {
    stack: Map<string, Object>;
    constructor(start?: any) {
        this.stack = new Map<string, Object>();
    }

    getRef(object: Object) {
        for (const e of this.stack.entries()) {
            if (object === e[1]) {
                return e[0];
            }
        }
    }

    push(value: Object) {
        if (value === null) {
            return null;
        }

        let ref = this.getRef(value);
        if (ref) {
            return ref;
        }

        ref = this.stackSet(value);

        this.stackDeepObjects(value);

        return ref;
    }

    private stackSet(value: Object) {
        const ref = randomUUID();
        this.stack.set(ref, value);
        return ref;
    }

    private stackDeepObjects(obj: Object) {
        if (obj === null) {
            return null;
        }

        //add deep objects to stack provided they are not already in there
        for (const ent of Object.entries(obj)) {
            if (typeof ent[1] === 'object') {
                this.push(ent[1]);
            }
        }
    }
}

export class DeserialisedObjectStack {
    stack: Map<string, Object>;
    constructor() {
        this.stack = new Map<string, Object>();
    }

    push(value: Object, ref: string) {
        if (!value) {
            this.stack.set(ref, null);
            return;
        }

        this.stack.set(ref, value);
    }

    resolveRefs() {
        for (const [key, object] of this.stack) {
            if (!object) {
                continue;
            }

            let entries;
            if (object.entries) {
                entries = object.entries();
            }
            else {
                entries = Object.entries(object);
            }

            for (const [prop, value] of entries) {
                if (typeof value !== "string" || !isRef(value)) {
                    continue;
                }

                if (object instanceof Map) {
                    this.stack.get(key)!.set(prop, this.stack.get(getRef(value)!));
                }
                else {
                    Object.defineProperty(this.stack.get(key)!, prop, { value: this.stack.get(getRef(value)!), enumerable: true });
                }
                
            }
        }
    }

    getObject(ref: string) {
        return this.stack.get(ref);
    }
}