import { higherorderbezier } from "../../../core/math";
import { vec3 } from "../../../core/math/models";
import TweenShape from "./models/tweenshape";

/**
 * Tween
 * Generates a tweened value given a normalised elapsed time and the style of tweening in the form of TweenShape. 
 * Normalised meaning the elapsed progress of an animation's duration
 * from 0 - 1 and should be calculated by the animation manager. 
 * @param progressElapsed Progress of animation
 * @param start Starting value
 * @param end End value
 * @param shape Style of tween, refer to https://easings.net/ for examples
 * @returns Tweened Value
 */
export function Tween(progressElapsed: number, start: number, end: number, shape: TweenShape): number {
    const normalisedBezier = higherorderbezier(progressElapsed, ...shape.getCurvePoints());
    const scaledBezier = normalisedBezier * (end - start);
    const tweened =  start + scaledBezier;
    return tweened;
}

/**
 * Tween Custom
 * Generates a tweened value given a normalised elapsed time and an array of points that define a bezier curve.
 * @param progressElapsed Progress of animation
 * @param points Array of points
 * @returns Tweened Value
 */
export function TweenCustom(progressElapsed: number, ...points: number[]) {
    return higherorderbezier(progressElapsed, ...points);
}

/**
 * Tween Position
 * Helper for generating tweened positions.
 * @param progressElapsed Progress of animation
 * @param startPosition Starting position for tween
 * @param endPosition End position for tween
 * @param shape Style of tween
 * @returns 
 */
export function TweenPosition(progressElapsed: number, startPosition: vec3, endPosition: vec3, shape: TweenShape): vec3 {
    const x = Tween(progressElapsed, startPosition.x, endPosition.x, shape);
    const y = Tween(progressElapsed, startPosition.y, endPosition.y, shape);
    const z = startPosition.z === 0 && endPosition.z === 0 ? 0 : Tween(progressElapsed, startPosition.z, endPosition.z, shape);
    const tweened = {
        x,
        y,
        z,
    };

    return tweened;
}

/**
 * TweenPositionCustom
 * Same functionality as TweenPosition except a custom array of points is provided instead of a TweenShape.
 * @param progressElapsed Progress of animation
 * @param positions Array of points
 * @returns 
 */
export function TweenPositionCustom(progressElapsed: number, ...positions: vec3[]) {
    const x = higherorderbezier(progressElapsed, ...(positions.map(p => p.x)));
    const y = higherorderbezier(progressElapsed, ...(positions.map(p => p.y)));
    const z = higherorderbezier(progressElapsed, ...(positions.map(p => p.z)));
    const tweened = {
        x,
        y,
        z,
    };

    return tweened;
}
