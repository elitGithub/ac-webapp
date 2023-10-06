import { Container } from "pixi.js";
import { vec2 } from "../../../core/math/models";
import TweenShape from "../../../framework/animations/tween/models";
import { IEngineEvent } from "../../enginesys";
import { RenderEffectProps } from "./renderop";

export type Animate = IEngineEvent & RenderEffectProps & {
    /**
     * name(optional)
     * Name of a registered animation can be used in place of specifying details of the animation.
     */
    name?: string;

    /**
     * target
     * Target to apply the animation on.
     */
    target: Container;

    /**
     * property
     * The property on the target to tween, e.g. rotation, position, alpha
     */
    property?: string;

    /**
     * to
     * value the property should be at by the end of the animation
     */
    to?: number|vec2;

    /**
     * duration
     * time the animation should play for in milliseconds
     */
    duration?: number;

    /**
     * easing
     * The style of tween for the value of the property being animated.
     */
    easing?: TweenShape;
}
