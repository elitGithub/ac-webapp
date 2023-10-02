type Animate  = IEngineEvent & {

}

type RenderableAnimation = {

}

class AnimationSystem implements EngineSystem {
    namedAnimations: RenderableAnimation[] = [];
    queuedAnimates:Animate[] = [];

    registerAnimation(name: string, type: RenderableAnimation) {

    }

    queue(animate: Animate) {
        this.queuedAnimates.push(animate);
    }

    update(time: number) {
        
    }
}