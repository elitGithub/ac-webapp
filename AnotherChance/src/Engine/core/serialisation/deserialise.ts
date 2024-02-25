import { DeserialisedObjectStack } from "./objectstack";

export type ClassDeserialiserTransform = (enumerable: Object) => any;
export interface ClassDeserialiser {
    serialisedClassAlias: string;
    class: Object;
    transform?: ClassDeserialiserTransform;
}

export class Deserialise {
    classDeserialiseMap: Map<string, ClassDeserialiser>;
    objectStack: DeserialisedObjectStack;

    constructor(...classDeserialisers: ClassDeserialiser[]) {
        this.classDeserialiseMap = new Map<string, ClassDeserialiser>();
        this.objectStack = new DeserialisedObjectStack();

        const arrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Array.name,
            class: Array,
            transform: (enumerable: Object) => { return Array.from(Object.values(enumerable)) },
        };

        const mapDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Map.name,
            class: Map,
            transform: (enumerable: Object) => { return new Map(Object.entries(enumerable)) },
        }

        const uint8ArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Uint8Array.name,
            class: Uint8Array,
            transform: (enumerable: Object) => {
                return new Uint8Array(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const uint16ArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Uint16Array.name,
            class: Uint16Array,
            transform: (enumerable: Object) => {
                return new Uint16Array(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const uint32ArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Uint32Array.name,
            class: Uint32Array,
            transform: (enumerable: Object) => {
                return new Uint32Array(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const uint8ClampedArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Uint8ClampedArray.name,
            class: Uint8ClampedArray,
            transform: (enumerable: Object) => {
                return new Uint8ClampedArray(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const int8ArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Int8Array.name,
            class: Int8Array,
            transform: (enumerable: Object) => {
                return new Int8Array(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const int16ArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Int16Array.name,
            class: Int16Array,
            transform: (enumerable: Object) => {
                return new Int16Array(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const int32ArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Int32Array.name,
            class: Int32Array,
            transform: (enumerable: Object) => {
                return new Int32Array(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const float32ArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Float32Array.name,
            class: Float32Array,
            transform: (enumerable: Object) => {
                return new Float32Array(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const float64ArrayDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Float64Array.name,
            class: Float64Array,
            transform: (enumerable: Object) => {
                return new Float64Array(Array.from(Object.values(enumerable)).map(val => this.deserialiseValue(val) as number));
            }
        }

        const defaultDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Object.name,
            class: Object,
            transform: (a: any) => { return a },
        }

        this.classDeserialiseMap.set(Array.name, arrayDeserialiser);
        this.classDeserialiseMap.set(Map.name, mapDeserialiser);
        this.classDeserialiseMap.set(Object.name, defaultDeserialiser);
        this.classDeserialiseMap.set(Uint8Array.name, uint8ArrayDeserialiser);
        this.classDeserialiseMap.set(Uint16Array.name, uint16ArrayDeserialiser);
        this.classDeserialiseMap.set(Uint32Array.name, uint32ArrayDeserialiser);
        this.classDeserialiseMap.set(Uint8ClampedArray.name, uint8ClampedArrayDeserialiser);
        this.classDeserialiseMap.set(Int8Array.name, int8ArrayDeserialiser);
        this.classDeserialiseMap.set(Int16Array.name, int16ArrayDeserialiser);
        this.classDeserialiseMap.set(Int32Array.name, int32ArrayDeserialiser);
        this.classDeserialiseMap.set(Float32Array.name, float32ArrayDeserialiser);
        this.classDeserialiseMap.set(Float64Array.name, float64ArrayDeserialiser);

        for (const cd of classDeserialisers) {
            this.classDeserialiseMap.set(cd.serialisedClassAlias, cd);
        }

    }

    deserialise(json: string) {
        let deserialised;
        const serialised = JSON.parse(json);
        const value = serialised.value as string;
        const data = serialised._data as string;
        this.reconstructData(data);

        deserialised = this.deserialiseValue(value);

        return deserialised;
    }

    deserialiseValue(value: string) {
        if (typeof value !== "string") {
            return;
        }

        const matches = value.match(/^\((\w*)\)\[(.*)\]$/);
        if (!matches || matches.length < 3) {
            return undefined;
        }

        switch (matches[1]) {
            case "REF": {
                const ref = matches[2];
                return this.objectStack.getObject(ref);
            }
            case "STRING": {
                return matches[2];
            }
            case "NUMBER": {
                if (matches[2].includes(".")) {
                    return Number.parseFloat(matches[2]);
                }
                else {
                    return Number.parseInt(matches[2], 10);
                }
            }
            case "BOOLEAN": {
                if (matches[2] === "false") {
                    return false;
                }
                else {
                    return true;
                }
            }
            case "BIGINT": {
                return BigInt(matches[2]);
            }
            case "SYMBOL": {
                return Symbol(matches[2]);
            }
        }
    }

    reconstructData(data: string) {
        const dataObject = JSON.parse(data);
        console.log(dataObject);
        for (const [k, v] of Object.entries(dataObject)) {
            let isFunction = false;
            let isClass = false;
            const methodMatch = v.match(/^[A-z]\w*\s*\(([A-z]\w*,?\s?)*\)\s*\{(\s*((.*)\s*)*)\}$/);
            const anonymousMatch = v.match(/^\((\w*)\)\s*=>\s*\{(\s*((.*)\s*)*)\}$/);
            let object;
            if (methodMatch || anonymousMatch) {
                isFunction = true;
                const match = methodMatch ?? anonymousMatch;
                if (!match[2].includes("[native code]")) {
                    object = new Function(match[2]);
                }
            }
            else if (v.startsWith("function")) {
                isFunction = true;
                if (!v.includes("[native code]")) {
                    object = new Function("return " + v);
                }
            }
            else if (v.startsWith("class")) {
                isFunction = true;
                object = {};
            }

            if (!isFunction) {
                const serialisedObject = JSON.parse(v);
                if (serialisedObject) {
                    const deserialiser = this.getDeserialiser(serialisedObject.constructorClass);
                    delete serialisedObject.constructorClass;
                    if (deserialiser.transform) {
                        object = deserialiser.transform(serialisedObject);
                    }
                    else if (deserialiser.class) {
                        Object.setPrototypeOf(object, deserialiser.class.prototype);
                    }
                    if (object) {
                        let entries;
                        if (object.entries) {
                            entries = object.entries();
                        }
                        else {
                            entries = Object.entries(object);
                        }
                        for (const [p, q] of entries) {
                            const val = this.deserialiseValue(q as string);
                            if (val !== undefined) {
                                Object.defineProperty(object, p, { value: val, enumerable: true });
                            }
                        }
                    }
                }
            }

            this.objectStack.push(object, k);
        }

        this.objectStack.resolveRefs();
    }

    getDeserialiser(classAlias: string): ClassDeserialiser {
        let deserialiser = this.classDeserialiseMap.get(classAlias);
        if (!deserialiser) {
            deserialiser = this.classDeserialiseMap.get(Object.name)!;
        }

        return deserialiser;
    }
}