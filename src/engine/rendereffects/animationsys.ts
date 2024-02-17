import { ObservablePoint } from "pixi.js";
import { EngineSystem, EngineBus, createEngineEvent, IEngineEvent } from "../enginesys";
import { Create_Named_Animate, Render_Animate, Render_Animation_Finish, Render_Clear_Animate } from "./models";
import { vec3 } from "../../core/math/models";
import TweenShape from "../../framework/animations/tween/models/tweenshape";
import { Animation } from "./models";
import { Animate } from "./models";
import { RenderEffectFlags, RenderEffectProps } from "./models";
import { Tween, TweenPosition } from "../../framework/animations/tween/tween";
import { AnimationListener } from "./models";

export type NamedAnimation = RenderEffectProps & {
    name: string;
    property: string;
    yoyo: boolean;
    to: number | vec3;
    easing: TweenShape;
}

export class AnimationSystem implements EngineSystem {
    namedAnimations: NamedAnimation[] = [];
    queuedAnimates: Animate[] = [];

    animating: Animation[] = [];

    constructor() {
        /*
        Should have this system listen to animate requests.
         */

        EngineBus.on(Create_Named_Animate, this.queue.bind(this));
        EngineBus.on(Render_Animate, this.queue.bind(this));
        EngineBus.on(Render_Clear_Animate, this.queue.bind(this));
    }

    registerAnimation(type: NamedAnimation) {
        if (this.namedAnimations.find(na => na.name === type.name)) {
            return;
        }

        this.namedAnimations.push(type);
    }

    queue(engineEvent: IEngineEvent) {
        if (engineEvent.event === Create_Named_Animate) {
            const cna = engineEvent as unknown as NamedAnimation;
            this.registerAnimation({
                name: cna.name,
                property: cna.property,
                yoyo: cna.yoyo,
                to: cna.to,
                easing: cna.easing,
                overlay: cna.overlay,
                override: cna.override
            });
        }
        else if (engineEvent.event === Render_Animate) {
            this.queuedAnimates.unshift(engineEvent as Animate);
        }
        else if (engineEvent.event === Render_Clear_Animate) {
            this.unqueue(engineEvent as Animate);
        }
    }

    unqueue(animate: Animate) {
        this.queuedAnimates = this.queuedAnimates.filter(anim => {
            if (anim.target === animate.target) {
                if (animate.name && animate.name === anim.name) {
                    return false;
                }
                
                if (animate.property && animate.property === anim.property) {
                    return false;
                }

            }

            return true;
        });

        for (let i = 0; i < this.animating.length; i++) {
            const anim = this.animating[i];
            if (anim.target === animate.target) {
                if ((anim.name && anim.name === animate.name) || (anim.property && anim.property === animate.property)) {
                    anim.clear = true;
                }
            }
        }
    }

    update(time: number) {
        let animate: Animate | undefined;
        while ((animate = this.queuedAnimates.pop()) !== undefined) {
            if (animate.name) {
                const registeredAnimation = this.namedAnimations.find(n => n.name === animate!.name);
                if (registeredAnimation) {
                    animate = { ...animate, ...registeredAnimation };
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

            //@ts-ignore
            if (animate.target[animate.property] === undefined) {
                console.error(`${animate.property} does not exist on target ${animate.target}.`);
                continue;
            }

            const anim = Animation.fromAnimate(animate);
            anim.setRenderEffectMode(animate.overlay ?? false, animate.override);

            if (this.canAnimationBeApplied(anim)) {
                this.animating.push(anim);
            }
        }

        //..run animations

        for (const animation of this.animating) {
            const currentTime = time ?? performance.now();
            let starting = false;
            if (animation.startingTime === -1) {
                animation.startingTime = currentTime;
                starting = true;
            }

            const endTime = animation.startingTime + animation.duration;
            if ((endTime <= currentTime) || animation.clear) {
                //finalise the end of the animation...
                if (!animation.yoyo && !animation.clear) {
                    //@ts-ignore
                    if (animation.target[animation.property] instanceof ObservablePoint) {
                        if (typeof animation.value === "number") {
                            //@ts-ignore
                            animation.target[animation.property].x = animation.value;
                            //@ts-ignore
                            animation.target[animation.property].y = animation.value;
                        }
                        else {
                            //@ts-ignore
                            animation.target[animation.property].x = animation.value.x;
                            //@ts-ignore
                            animation.target[animation.property].y = animation.value.y;
                        }

                    }
                    else {
                        //@ts-ignore
                        animation.target[animation.property] = animation.value;
                    }
                }
                else {
                    //@ts-ignore
                    if (animation.target[animation.property] instanceof ObservablePoint) {
                        if (typeof animation._startingValue === "number") {
                            //@ts-ignore
                            animation.target[animation.property].x = animation._startingValue;
                            //@ts-ignore
                            animation.target[animation.property].y = animation._startingValue;
                        }
                        else {
                            //@ts-ignore
                            animation.target[animation.property].x = (animation._startingValue as vec3).x;
                            //@ts-ignore
                            animation.target[animation.property].y = (animation._startingValue as vec3).y;
                        }

                    }
                    else {
                        //@ts-ignore
                        animation.target[animation.property] = animation._startingValue;
                    }
                }


                EngineBus.emit(Render_Animation_Finish, createEngineEvent(Render_Animation_Finish, animation));
                let index = this.animating.findIndex(a => a === animation);
                if (index === -1) {
                    console.log(`concerning ${animation}`);
                    index = this.animating.findIndex(a => a.eventId === animation.eventId);
                    if (index !== -1) {
                        this.animating.splice(index, 1);
                    }
                    else {
                        throw new Error(`Could not find ${animation}. Pls fix logic.`);
                    }
                }
                else {
                    this.animating.splice(index, 1);
                }
                continue;
            }

            const diffTime = endTime - currentTime;
            const timeFrac = (animation.duration - diffTime) / animation.duration;
            const easing = animation.easing ?? new TweenShape(0, 1);
            //@ts-ignore
            if (animation.target[animation.property] instanceof ObservablePoint) {
                //@ts-ignore
                const x = animation.target[animation.property].x;
                //@ts-ignore
                const y = animation.target[animation.property].y;
                if (starting) {
                    animation.setAnimationStartValue({ x, y, z: 0 });
                }

                let tweenedPosition;
                if (typeof animation.value === "number") {
                    tweenedPosition = TweenPosition(timeFrac, animation.getAnimationStartValue() as vec3, { x: animation.value, y: animation.value, z: 0 }, easing);
                }
                else {
                    tweenedPosition = TweenPosition(timeFrac, animation.getAnimationStartValue() as vec3, { x: animation.value.x, y: animation.value.y, z: 0 }, easing);
                }

                //@ts-ignore
                animation.target[animation.property].x = tweenedPosition.x;
                //@ts-ignore
                animation.target[animation.property].y = tweenedPosition.y;
                console.log(`TimeFrac(${timeFrac}): Tweenx(${tweenedPosition.x})`);
                console.log(`TimeFrac(${timeFrac}): Tweeny(${tweenedPosition.y})`);
            }
            else {
                //@ts-ignore
                const value = animation.target[animation.property];
                if (starting) {
                    animation.setAnimationStartValue(value);
                }

                const tweenedValue = Tween(timeFrac, animation.getAnimationStartValue() as number, animation.value as number, easing);
                //@ts-ignore
                animation.target[animation.property] = tweenedValue;
                //console.log(`TimeFrac(${timeFrac}): Tween(${tweenedValue})`);
            }
        }
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

    subscribeToAnimationEvents(listener: AnimationListener) {
        EngineBus.on(Render_Animation_Finish, listener.onAnimationsFinish.bind(listener));
    }
}