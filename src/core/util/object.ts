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