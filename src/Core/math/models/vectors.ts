export type vec2 = {
    x: number;
    y: number;
}

export type vec3 = {
    x: number;
    y: number;
    z: number;
}

export type vec4 = {
    x: number;
    y: number;
    z: number;
    w: number;
}

export function vec2ToArray(v2: vec2) {
    return [v2.x, v2.y];
}

export function vec3ToArray(v3: vec3) {
    return [v3.x, v3.y, v3.z];
}

export function vec4ToArray(v4: vec4) {
    return [v4.x, v4.y, v4.z, v4.w];
}