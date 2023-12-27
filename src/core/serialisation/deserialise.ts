import { DeserialisedObjectStack } from "./objectstack";

export type ClassDeserialiserTransform = (enumerable: Object) => any;
export interface ClassDeserialiser {
    serialisedClassAlias: string;
    class: Object;
    transform: ClassDeserialiserTransform;
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

        const defaultDeserialiser: ClassDeserialiser = {
            serialisedClassAlias: Object.name,
            class: Object,
            transform: (a: any) => { return a },
        }

        this.classDeserialiseMap.set(Array.name, arrayDeserialiser);
        this.classDeserialiseMap.set(Map.name, mapDeserialiser);
        this.classDeserialiseMap.set(Object.name, defaultDeserialiser);

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
            const methodMatch = v.match(/^[A-z]\w*\s*\((\w*)\)\s*\{\s*((.*)\s*)*\}$/);
            let object;
            if (methodMatch) {
                isFunction = true;
                if (!methodMatch[2].includes("[native code]")) {
                    object = new Function(methodMatch[2]);
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
                    object = deserialiser.transform(serialisedObject);
                    if (object) {
                        for (const [p, q] of Object.entries(object)) {
                            const val = this.deserialiseValue(q as string);
                            if (val) {
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