import { vec2, vec4 } from "../../../Core/math/models";

export default interface IRenderPlatform {
    getDimensions(): vec2;
    setDimensions(width: number, height: number): void;
    getResolution(): number;
    setResolution(resolution: number): void;
    getBackgroundColor(): vec4;
    setBackgroundColor(r: number, g?: number, b?: number, a?: number): void
    getViewElement(): HTMLElement | undefined;
    setViewElement(view: HTMLElement): void;
}