export function isRef(v: string) {
    const matches = v.match(/^\((\w*)\)\[(.*)\]$/);
    if (!matches || matches.length < 3) {
        return false;
    }

    return matches[1] === "REF";
}

export function getRef(v: string) {
    const matches = v.match(/^\((\w*)\)\[(.*)\]$/);
    if (!matches || matches.length < 3) {
        return undefined;
    }

    return matches[2];
}