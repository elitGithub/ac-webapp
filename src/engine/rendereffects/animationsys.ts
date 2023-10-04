import { Container } from "pixi.js";
import { IEngineEvent, EngineSystem, EngineBus } from "../enginesys";
import { Render_Animate, Render_Clear_Animate } from "./models/events";
import { vec2 } from "../../core/math/models";
import TweenShape from "../../framework/animations/tween/models/tweenshape";
import { Animation } from "./models/animation";

type Animate = IEngineEvent & {
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

    /**
     * override
     * can this animation override current animations running on this target and on this property?
     */
    override?: boolean;

    /**
     * overlay
     * can this animation play concurrently with animations of a different property running on this target?
     */
    overlay?: boolean;
}

type RenderableAnimation = {

}

class AnimationSystem implements EngineSystem {
    namedAnimations: RenderableAnimation[] = [];
    queuedAnimates:Animate[] = [];

    animating: Animation[] = [];

    constructor() {
        EngineBus.on(Render_Animate, this.queue.bind(this));
        EngineBus.on(Render_Clear_Animate, this.unqueue.bind(this));
    }

    registerAnimation(name: string, type: RenderableAnimation) {

    }

    queue(animate: Animate) {
        this.queuedAnimates.unshift(animate);
    }

    unqueue(animate: Animate) {
        
    }

    update(time: number) {
        let animate;
        while ((animate = this.queuedAnimates.pop()) !== undefined) {

        }
    }
}