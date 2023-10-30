import { Container } from "pixi.js";
import { EngineBus, EngineSystem, IEngineEvent } from "../enginesys";
import { GPU_PREPARE, RENDER_STAGE_CHANGE } from "./models";
import { PixiRenderer } from "../../framework/graphics/pixirenderer";
import { vec2 } from "../../core/math/models";

export class RenderSystem implements EngineSystem {

    renderer: PixiRenderer;
    pendingRenderChanges: Function[];

    constructor(opts: any) {
        this.renderer = new PixiRenderer(opts.render.renderer);
        this.pendingRenderChanges = [];
        EngineBus.on(GPU_PREPARE, this.queue.bind(this));
        EngineBus.on(RENDER_STAGE_CHANGE, this.queue.bind(this));
    }

    prepareRenderable(renderable: Container) {
        return this.renderer.uploadToGPU(renderable);
    }

    attachRendererTo(element: HTMLElement) {
        this.renderer.setViewElement(element);
    }
    
    screenPositionByRatio(x: number, y: number): vec2 {
        const size = this.renderer.getDimensions();
        return {x: x * size.x, y: y *size.y};
    }

    screenRatioByPosition(x: number, y: number): vec2 {
        const size = this.renderer.getDimensions();
        return {x: x/size.x, y: y/size.y};
    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === RENDER_STAGE_CHANGE) {
            this.pendingRenderChanges.unshift(() => this.renderer.updateStage((engineEvent as any)["scene"]));
        }
    }

    update(time: number): void {
        while (this.pendingRenderChanges.length > 0) {
            this.pendingRenderChanges.pop()!();
        }
        this.renderer.update(time);
    }
    
}