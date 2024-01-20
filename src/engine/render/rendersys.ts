import { Container } from "pixi.js";
import { EngineBus, EngineSystem, IEngineEvent, getEngine } from "../enginesys";
import { GPU_PREPARE, RENDER_HUD_CHANGE, RENDER_STAGE_CHANGE } from "./models";
import { PixiRenderer } from "../../framework/graphics/pixirenderer";
import { vec2 } from "../../core/math/models";

enum RenderUpdateType {
    STAGE,
    HUD,
}

interface RenderUpdate {
    type: RenderUpdateType;
    data: any;
}

export class RenderSystem implements EngineSystem {

    renderer: PixiRenderer;
    pendingRenderChanges: RenderUpdate[];

    constructor(opts: any) {
        this.renderer = new PixiRenderer(opts.render.renderer);
        this.pendingRenderChanges = [];
        EngineBus.on(GPU_PREPARE, this.queue.bind(this));
        EngineBus.on(RENDER_HUD_CHANGE, this.queue.bind(this));
        EngineBus.on(RENDER_STAGE_CHANGE, this.queue.bind(this));
    }

    prepareRenderable(renderable: Container) {
        return this.renderer.uploadToGPU(renderable);
    }

    attachRendererTo(element: HTMLElement) {
        this.renderer.setViewElement(element);
    }
    
    getDimensions() {
        return this.renderer.getDimensions();
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
            this.pendingRenderChanges.unshift({type: RenderUpdateType.STAGE, data: (engineEvent as any)["scene"]});
        }
        else if (engineEvent.event === RENDER_HUD_CHANGE) {
            this.pendingRenderChanges.unshift({type: RenderUpdateType.HUD, data: (engineEvent as any)["hudElements"]});
        }
    }

    update(time: number): void {
        const requeue = [];
        while (this.pendingRenderChanges.length > 0) {
            const update = this.pendingRenderChanges.pop()!;
            if (update.type === RenderUpdateType.STAGE) {
                this.renderer.updateStage(update.data);
            }
            else if (update.type === RenderUpdateType.HUD) {
                if (getEngine().getScene().isSceneReady()) {
                    this.renderer.setHud(update.data);
                }
                else {
                    requeue.unshift(update);
                }
            }
        }
        this.pendingRenderChanges.unshift(...requeue);
        this.renderer.update(time);
    }
    
}