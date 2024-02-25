import { getAnyClass, getNativeClass } from "../util/object";
import { SerialisedObjectStack } from "./objectstack";

export class Serialise {
    objectStack: SerialisedObjectStack;

    constructor() {
        this.objectStack = new SerialisedObjectStack();
    }

    serialise(any: any) {
        const serialised = {value: this.serialiseValue(any), _data: this.serialiseDataRegion()};
        return JSON.stringify(serialised);
    }

    private serialiseValue(value: any) {
        switch (typeof value) {
            case "string":
                return `(STRING)[${value}]`;
            case "number":
                return `(NUMBER)[${value}]`;
            case "bigint":
                return `(BIGINT)[${value}]`;
            case "boolean":
                return `(BOOLEAN)[${value}]`;
            case "symbol":
                return `(SYMBOL)[${(value as Symbol).description}]`;
            case "undefined":
                return "undefined";
            case "object": {
                if (value === null) {
                    return "(REF)[NULL]";
                }
            }
            case "function":
                const ref = this.objectStack.push(value);
                return `(REF)[${ref}]`;
        }
    }

    private serialiseDataRegion() {
        const serialised = {};
        for (const [key, ref] of this.objectStack.stack.entries()) {
            if (key instanceof Array) {
                Object.defineProperty(serialised, ref, { value: this.serialiseArray(key), enumerable: true });
            }
            else if (key instanceof Map) {
                Object.defineProperty(serialised, ref, { value: this.serialiseMap(key), enumerable: true });
            }
            else if (typeof key === `function`) {
                Object.defineProperty(serialised, ref, { value: this.serialiseFunction(key), enumerable: true });
            }
            else if (typeof key === 'object') {
                Object.defineProperty(serialised, ref, { value: this.serialiseObject(key), enumerable: true });
            }
        }

        return JSON.stringify(serialised);
    }

    serialiseObject(object: Object) {
        const iterator = Object.entries(object);
        const serialised = {
            constructorClass: getAnyClass(object) ?? getNativeClass(object),
        };

        for (const entry of iterator) {
            let prop = entry[0];
            let value = this.serialiseValue(entry[1]);

            Object.defineProperty(serialised, prop, { value, enumerable: true });
        }

        return JSON.stringify(serialised);
    }

    serialiseFunction(func: Function) {
        return func.toString();
    }

    serialiseIterable(iterable: IterableIterator<[any, any]>, serialiseTarget: Object) {
        for (const entry of iterable) {
            let prop = entry[0];
            let value = this.serialiseValue(entry[1]);

            Object.defineProperty(serialiseTarget, prop, { value, enumerable: true });
        }

        return JSON.stringify(serialiseTarget);
    }

    serialiseArray(array: Array<any>): string {
        const serialised: Object = {
            constructorClass: array.constructor.name,
        };
        
        return this.serialiseIterable(array.entries(), serialised);
    }

    serialiseMap(map: Map<any, any>) {
        const serialised: Object = {
            constructorClass: map.constructor.name,
        }
        
        return this.serialiseIterable(map.entries(), serialised);
    }
}