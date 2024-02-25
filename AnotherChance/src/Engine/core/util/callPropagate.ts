export function callPropagate(objects: Array<any>, property: string, ...args: any) {
    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        if (obj.hasOwnProperty(property) && typeof obj[property] === "function") {
            obj[property](...args);
        }
    }
}
