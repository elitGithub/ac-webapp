import { EventBus } from "../../framework/events";
import { IEngineEvent, EngineSystem } from "../enginesys";

type Animate = IEngineEvent & {

}

type RenderableAnimation = {

}

class AnimationSystem implements EngineSystem {
    namedAnimations: RenderableAnimation[] = [];
    queuedAnimates:Animate[] = [];

    constructor() {
        EventBus.on("animate", this.queue.bind(this));
    }

    registerAnimation(name: string, type: RenderableAnimation) {

    }

    queue(animate: Animate) {
        this.queuedAnimates.push(animate);
    }

    update(time: number) {
        
    }
}