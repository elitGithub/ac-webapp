class CompressedAsset {
    originalSource: URL;
    decompressedSource: URL | undefined;

    constructor(source: URL) {
        this.originalSource = source;
    }

    getOriginal(): string {
        return this.originalSource.href;
    }

    getDecompressed(): string | undefined {
        return this.decompressedSource?.href;
    }
}