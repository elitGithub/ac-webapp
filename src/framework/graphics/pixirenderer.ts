import { vec2, vec4, vec4ToArray } from "../../core/math/models";
import {IRenderPlatform} from "./interfaces";
import { ICanvas, IRenderer, autoDetectRenderer, Container, Color } from "pixi.js";

export type PixiRendererOptions = {
    width?: number;
    height?: number;
    fullscreen: boolean;
    resolution?: number;
    defaultBackgroundColor?: vec4;
    parent?: HTMLElement;
    gpu: boolean;
    mobile: boolean;
}

export class PixiRenderer implements IRenderPlatform {

    protected renderer: IRenderer<ICanvas>;
    protected parentElement?: HTMLElement;
    private mainStage: Container;
    private hudStage: Container;
    private sceneStage: Container;
    private animating: boolean;
    private ratio: number;
    

    constructor(options: PixiRendererOptions) {
        console.log("wow");
        this.ratio = (options.width??0)/(options.height??0);
        let renderer: IRenderer<ICanvas>;
        if (options.gpu) {
            renderer = autoDetectRenderer({
                width: options.width,
                height: options.height,
                resolution: options.resolution,
                powerPreference: options.mobile ? "low-power" : "default",
                hello: true, // To change depending on debug mode
                backgroundColor: options.defaultBackgroundColor ? vec4ToArray(options.defaultBackgroundColor) : undefined,
            });
        }
        else {
            renderer = autoDetectRenderer({
                width: options.width,
                height: options.height,
                resolution: options.resolution,
                hello: true, // To change depending on debug mode
                backgroundColor: options.defaultBackgroundColor ? vec4ToArray(options.defaultBackgroundColor) : undefined,
                forceCanvas: true,
            });
        }

        window.addEventListener("resize", this.resize.bind(this));

        this.renderer = renderer;
        this.mainStage = new Container();
        this.mainStage.sortableChildren = true;
        this.sceneStage = new Container();
        this.mainStage.addChild(this.sceneStage);
        this.hudStage = new Container();
        this.hudStage.zIndex = 1;
        this.mainStage.addChild(this.hudStage);
        this.animating = false;
        
        if (options.parent) {
            this.setViewElement(options.parent);
        }

        this.resize();
    }

    getDimensions(): vec2 {
        console.log(`${this.renderer.width} ${this.renderer.height}`)
        return {x: this.renderer.width, y: this.renderer.height};
    }
    setDimensions(width: number, height: number): void {
        this.renderer.resize(width, height);
    }
    getResolution(): number {
        return this.renderer.resolution;
    }
    setResolution(resolution: number): void {
        throw new Error("Method not implemented.");
    }

    resize() {
        //this.setDimensions(this.parentElement?.offsetWidth, this.parentElement?.offsetHeight);
        let w, h;
        if (window.innerWidth / window.innerHeight >= this.ratio) {
            w = window.innerHeight * this.ratio;
            h = window.innerHeight;
        } else {
             w = window.innerWidth;
             h = window.innerWidth / this.ratio;
        }
        this.renderer.view.style.width = w + 'px';
        this.renderer.view.style.height = h + 'px';
    }

    getBackgroundColor(): vec4 {
        const color = this.renderer.background.backgroundColor;
        return {x: color.red, y: color.green, z: color.blue, w: color.alpha};
    }
    setBackgroundColor(r: number, g?: number | undefined, b?: number | undefined, a?: number | undefined): void {
        this.renderer.background.color = new Color(new Uint8Array([r, g??0, b??0, a??1]));
    }
    getViewElement(): HTMLElement | undefined {
        return this.parentElement;
    }
    setViewElement(view: HTMLElement): void {
        this.parentElement = view;
        this.parentElement.appendChild<any>(this.renderer.view);
    }

    start() {
        this.animating = true;
    }

    stop() {
        this.animating = false;
    }

    uploadToGPU(renderable: Container) {
        return this.renderer.prepare.upload(renderable);
    }

    setHud(hudElements: Container[]) {
        this.hudStage.removeChildren();
        this.hudStage.addChild(...hudElements);
    }

    updateStage(stageChild: Container) {
        this.mainStage.removeChildAt(0);
        this.mainStage.addChildAt(stageChild, 0);
    }

    update(dt: number) {
        this.renderer.render(this.mainStage);
    }
}
