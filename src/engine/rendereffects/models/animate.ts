import { Container } from "pixi.js";
import { vec2, vec3 } from "../../../core/math/models";
import TweenShape from "../../../framework/animations/tween/models";
import { EngineBus, IEngineEvent, createEngineEvent } from "../../enginesys";
import { RenderEffectProps } from "./renderop";
import { Create_Named_Animate, Render_Animate } from "./events";

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
     * yoyo
     * Let's the animation system know that this is specifically a yoyo animation and to skip setting the to property as the final value on the last frame,
     * thus only using the TweenShape to guide the value.
     */
    yoyo: boolean;

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

export function createNamedAnimate(name: string, property: string, yoyo: boolean, to: number|vec3, easing?: TweenShape, overlay?: boolean, override?: boolean) {
    EngineBus.emit(Create_Named_Animate, createEngineEvent(Create_Named_Animate, {
        name,
        property,
        yoyo,
        to,
        easing,
        overlay,
        override,
    }));
}

export function queueNamedAnimate(target: Container, namedAnimation: string, duration: number) {
    EngineBus.emit(Render_Animate, createEngineEvent(Render_Animate, {
        name: namedAnimation,
        target,
        duration
    }));
}

export function queueAnimate(target: Container, property: string, yoyo: boolean, to: number|vec3, duration: number, easing?: TweenShape, overlay?: boolean, override?: boolean) {
    EngineBus.emit(Render_Animate, createEngineEvent(Render_Animate, {
        target,
        property,
        yoyo,
        to,
        duration,
        easing,
        overlay,
        override
    }));
}
