import { Texture } from "pixi.js";
import { EngineSystem, IEngineEvent } from "..";
import { IRenderableResource } from "../../framework/graphics";
import AssetLoader from "../../framework/loader/AssetLoader";

export interface LoadedAsset {
    data: any,
    pixiId: string,
}

export interface LoadedTextureAsset {
    texture: Texture,
    pixiId: string,
}

export class AssetSystem implements EngineSystem {

    assetLoader: AssetLoader;

    constructor() {
        this.assetLoader = new AssetLoader();
    }

    async loadTexture(resource: IRenderableResource) {
        const texture = await this.load(resource);
        return { texture: texture?.data, pixiId: texture?.pixiId } as LoadedTextureAsset;
    }

    async load(resource: IRenderableResource) {
        try {
            if (resource.source instanceof URL) {
                const asset = await this.assetLoader.load([resource.source.href]);
                if (asset) {
                    return { data: asset[resource.source.href], pixiId: asset["_pixiId"] } as LoadedAsset;
                }
            } else if (typeof resource.source === "string") {
                const asset = await this.assetLoader.load([resource.source]);
                if (asset) {
                    return { data: asset[resource.source], pixiId: asset["_pixiId"] } as LoadedAsset;
                }
            }
        } catch (e) {
            console.log(`Failed to load resource, trace: ${e}, tried to load the following resource: ${resource.source}`);
            return;
        }

    }

    queue(engineEvent: IEngineEvent): void {
        console.log(engineEvent);
        throw new Error("Method not implemented.");
    }

    update(time: number): void {
        console.log(time);
        throw new Error("Method not implemented.");
    }
}
