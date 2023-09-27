export let MAX_CURVE_POINTS = 10;

/**
 * setmaxcurvepoints
 * This sets a limit on how many points you are allowed to use for constructing bezier curves using the higherorderbezier function.
 * There is a limit because it can get really expensive if you were to set a ridiculous size.
 * Since the TWS team will be allowed to create their own animations and thus easing functions, the function is exposed if they want
 * to create more complicated curves. However, with great power comes great responsibility.
 * @param limit Amount of points allowed to be set on a bezier curve interpolation.
 */
export function setmaxcurvepoints(limit: number) {
    MAX_CURVE_POINTS = limit;
}

export function linearbezier(t: number, p0: number, p1: number) {
    const bt = p0 + (t * p1) - (t * p0);
    return bt;
}

export function quadraticbezier(t: number, p0: number, p1: number, p2: number) {
    let q0 = linearbezier(t, p0, p1)
    q0 = q0 - (t * q0)
    let q1 = linearbezier(t, p1, p2)
    q1 = t * q1
    const bt = q0 + q1
    return bt;
}

export function cubicbezier(t: number, p0: number, p1: number, p2: number, p3: number) {
    let r0 = quadraticbezier(t, p0, p1, p2);
    r0 = r0 - (t * r0);
    let r1 = quadraticbezier(t, p1, p2, p3);
    r1 = t * r1;
    const bt = r0 + r1;
    return bt;
}

export function higherorderbezier(t: number, ...points: number[]) {
    switch (points.length) {
        case 2: return linearbezier(t, points[0], points[1]);
        case 3: return quadraticbezier(t, points[0], points[1], points[2]);
        case 4: return cubicbezier(t, points[0], points[1], points[2], points[3]);
    }

    if (points.length < 2) {
        throw new Error(
            `higherorderbezier - not enough data points to create interpolation: 
            ${points.length} arg${points.length !== 1 ? "s" : ""} provided`
        );
    }

    if (points.length > MAX_CURVE_POINTS) {
        throw new Error(
            `higherorderbezier - too many data points, max is ${MAX_CURVE_POINTS}:
            ${points.length} args provided.
            Change limit through math.setmaxcurvepoints.`
        );
    }

    let x0: number = higherorderbezier(t, ...points.slice(0, -1));
    x0 = x0 - (t * x0);
    let x1: number = higherorderbezier(t, ...points.slice(1));
    x1 = t * x1;

    return x0 + x1;
}
