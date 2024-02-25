import { ClassDeserialiser } from "../serialisation";

export function getNativeClass(obj: Object) {
    if (typeof obj === "undefined") return "undefined";
    if (obj === null) return "null";
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
}

export function getAnyClass(obj: Object) {
    if (typeof obj === "undefined") return "undefined";
    if (obj === null) return "null";
    return obj.constructor?.name;
}

export function controlledObjectMerge(targetObject: Object, sourceObject: Object, propertiesToMerge: any[]) {
    for (const [k,v] of Object.entries(sourceObject)) {
        if (k in propertiesToMerge) {
            const pd = Object.getOwnPropertyDescriptor(targetObject, k);
            if (!pd) {
                Object.defineProperty(targetObject, k, {configurable: true, enumerable: true, value: v, writable: true});
            }
            else {
                Object.defineProperty(targetObject, k, {...pd, value: v});
            }
        }
    }
}