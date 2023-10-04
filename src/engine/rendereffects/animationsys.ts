import { IEngineEvent, EngineSystem, EngineBus } from "../enginesys";
import { Render_Animate, Render_Clear_Animate } from "./models/events";

type Animate = IEngineEvent & {

}

type RenderableAnimation = {

}

class AnimationSystem implements EngineSystem {
    namedAnimations: RenderableAnimation[] = [];
    queuedAnimates:Animate[] = [];

    constructor() {
        EngineBus.on(Render_Animate, this.queue.bind(this));
        EngineBus.on(Render_Clear_Animate, this.unqueue.bind(this));
    }

    registerAnimation(name: string, type: RenderableAnimation) {

    }

    queue(animate: Animate) {
        this.queuedAnimates.push(animate);
    }

    unqueue(animate: Animate) {
        
    }

    update(time: number) {
        
    }
}