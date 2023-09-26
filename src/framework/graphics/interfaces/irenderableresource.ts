export type IResourceID = "";
export interface IRenderableResource {
    source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | URL | IResourceID;
}