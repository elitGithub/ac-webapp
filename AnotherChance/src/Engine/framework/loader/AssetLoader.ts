import { Assets } from 'pixi.js';
import { GZipLoader } from './CompressedLoader';

export interface AssetManifest {
    name: string;
    assets: [{
        name: string;
        srcs: string;
    }];
}

class AssetLoader {

    compressLoader: GZipLoader;

    constructor() {
        this.compressLoader = new GZipLoader();
    }

    async initAssetBundles(manifest: AssetManifest[]) {
        await Assets.init({
            manifest: {
                bundles: [
                    ...manifest
                ],
            },
        });
    }

    async load(sources: string[], background: boolean = false) {
        try {
            if (!background) {
                return await Assets.load(sources);
            } else {
                return await Assets.backgroundLoad(sources);
            }
        } catch (error) {
            console.error(`Failed to load assets: ${sources.join(", ")}`, error);
            throw error; // Re-throw the error if you want to handle it further up the chain.
        }
    }

    async loadCompressed(sources: string[], background: boolean = false) {
        let decompressed = [];
        for (let i = 0; i < sources.length; i++) {
            const ca = await this.compressLoader.load(sources[i]);
            decompressed.push(ca.getDecompressed()!);
        }

        return this.load(decompressed, background);
    }

    loadBundle(bundle: string, background: boolean = false) {
        if (!background) {
            return Assets.loadBundle(bundle);
        }
        else {
            return Assets.backgroundLoadBundle(bundle);
        }
    }

}

export default AssetLoader;
