import { Container } from "pixi.js";
import { EngineSystem, EngineBus } from "../enginesys";
import { Render_Animate, Render_Clear_Animate } from "./models/events";
import { vec2 } from "../../core/math/models";
import TweenShape from "../../framework/animations/tween/models/tweenshape";
import { Animation } from "./models/animation";
import { Animate } from "./models/animate";
import { RenderEffectFlags } from "./models/renderop";

type RenderableAnimation = {
    name: string;
    animation: Animation;
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
        let animate: Animate | undefined;
        while ((animate = this.queuedAnimates.pop()) !== undefined) {
            if (animate.name) {
                const registeredAnimation = this.namedAnimations.find(n => n.name === animate!.name);
                if (registeredAnimation) {
                    //...
                    continue;
                }
            }
            
            if (!animate.property) {
                console.error(`property undefined for animate event.`);
                continue;
            }

            if (!animate.target) {
                console.error(`target undefined for animate event.`);
                continue;
            }

            if (!animate.target[animate.property]) {
                console.error(`${animate.property} does not exist on target ${animate.target}.`);
                continue;
            }
            
            const anim = Animation.fromAnimate(animate);
            anim.setRenderEffectMode(animate.overlay??false, animate.override);

            if (this.canAnimationBeApplied(anim)) {
                this.animating.push(anim);
            }
        }

        //..run animations
    }

    canAnimationBeApplied(animation: Animation): boolean {
        const conflictingTargets = this.animating.find(anim => {
            if (anim.target !== animation.target) {
                return false;
            }

            const mode = animation.getRenderEffectMode();

            if ((mode & RenderEffectFlags.RE_OVERLAY) && anim.property !== animation.property) {
                return false;
            }

            if ((mode & RenderEffectFlags.RE_OVERRIDE) && anim.property === animation.property) {
                return false;
            }

            return true;
        });

        if (conflictingTargets) {
            return false;
        }
        
        return true;
    }
}