import { Container } from "pixi.js";
import { vec2, vec3 } from "../../../core/math/models";
import TweenShape from "../../../framework/animations/tween/models";
import { EngineBus, IEngineEvent, createEngineEvent } from "../../enginesys";
import { RenderEffectProps } from "./renderop";
import { Render_Animate } from "./events";

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
    to?: number|vec3;

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

export function queueNamedAnimate(target: Container, namedAnimation: string) {

}

export function queueAnimate(target: Container, property: string, to: number|vec3, duration: number, easing?: TweenShape, overlay?: boolean, override?: boolean) {
    EngineBus.emit(Render_Animate, createEngineEvent({
        target,
        property,
        to,
        duration,
        easing,
        overlay,
        override
    }));
}
