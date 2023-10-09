import { Container } from "pixi.js";
import { EngineBus, EngineSystem, IEngineEvent } from "../enginesys";
import { GPU_PREPARE } from "./models";
import { PixiRenderer } from "../../framework/graphics/pixirenderer";

export type PrepRenderable = IEngineEvent & {

};

export class RenderSystem implements EngineSystem {

    renderer: PixiRenderer;

    constructor(opts: any) {
        this.renderer = new PixiRenderer(opts.renderer);
        EngineBus.on(GPU_PREPARE, this.queue.bind(this));
    }

    prepareRenderable(renderable: Container) {
        return this.renderer.uploadToGPU(renderable);
    }

    queue(engineEvent: IEngineEvent): void {
        throw new Error("Method not implemented.");
    }
    update(time: number): void {
        throw new Error("Method not implemented.");
    }
    
}