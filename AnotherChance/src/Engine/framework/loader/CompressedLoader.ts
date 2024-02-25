import * as Pako from "pako";
const BROWSER = window;

export class GZipLoader {

    private cache: Map<string, CompressedAsset>;

    constructor() {
        this.cache = new Map<string, CompressedAsset>();
    }

    private Cache(asset: CompressedAsset) {
        this.cache.set(asset.originalSource.href, asset);
        return asset;
    }

    async load(source: string | URL | CompressedAsset): Promise<CompressedAsset> {
        if (typeof source === "string") {
            if (this.cache.has(source)) {
                return this.cache.get(source)!;
            }
            return this.Cache(await this.decompress(new CompressedAsset(new URL(source))));
        }
        else if (source instanceof URL) {
            if (this.cache.has(source.href)) {
                return this.cache.get(source.href)!;
            }

            return this.Cache(await this.decompress(new CompressedAsset(source)));
        }
        else if (source instanceof CompressedAsset) {
            if (source.decompressedSource) {
                return source;
            }
            else {
                if (this.cache.has(source.originalSource.href)) {
                    return this.cache.get(source.originalSource.href)!;
                }

                return this.Cache(await this.decompress(source));
            }
        }

        throw new Error(`${typeof source} is invalid argument for GZipLoader.load.`);
    }

    private createURL(blob: Blob) {
        return URL.createObjectURL(blob);
    }

    async fileDecompress(chunks: ArrayBuffer) {
        return Pako.ungzip(chunks);
    }

    private async decompress(asset: CompressedAsset) {
        const init: RequestInit = {
            method: "GET",
        };
        const response = await fetch(asset.getOriginal(), init);
        const data = (await (await response.blob()).arrayBuffer());
        const decompressed = await this.fileDecompress(data);
        asset.decompressedSource = new URL(this.createURL(new Blob([decompressed])));
        return asset;
    }
}