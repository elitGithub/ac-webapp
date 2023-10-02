import { vec2, vec4, vec4ToArray } from "../../core/math/models";
import {IRenderPlatform} from "./interfaces";
import { ICanvas, IRenderer, autoDetectRenderer, Ticker, Container, Color } from "pixi.js";

export type PixiRendererOptions = {
    width?: number;
    height?: number;
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
    private animating: boolean;
    private ticker: Ticker;
    private gameLoops = [];

    constructor(options: PixiRendererOptions) {
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

        if (options.parent) {
            this.parentElement = options.parent;
        }

        this.renderer = renderer;
        this.mainStage = new Container();
        this.ticker = Ticker.shared;
        this.ticker.stop();
        this.ticker.autoStart = false;
        this.animating = false;
    }

    getDimensions(): vec2 {
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

    private renderLoop(time: number) {
        this.ticker.update(time);
        this.renderer.render(this.mainStage);
    }
}