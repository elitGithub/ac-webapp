export * from "./genSpriteHitmap";
export * from "./callPropagate";
export * from "./sceneutils";

export function randomUUID() {
    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    if (crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return uuidv4();
}