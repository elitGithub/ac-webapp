type LayerConfig = {
    [key: string]: number; // Use string keys for dynamic layer names
};

export default class LayerManager {
    private static instance: LayerManager | undefined;
    public layersConfig: LayerConfig = {
        // Initial layers
        hiddenDepth: -1,
        baseLayer: 0,
        firstLayerDepth: 1,
        secondLayerDepth: 2,
        thirdLayerDepth: 3
    };

    static getInstance() {
        if (!(LayerManager.instance instanceof LayerManager) || typeof LayerManager.instance === 'undefined') {
            LayerManager.instance = new LayerManager();
        }
        return LayerManager.instance;
    }

    addLayer(layerName: string, depth: number) {
        this.layersConfig[layerName] = depth;
    }

    get layers(): LayerConfig {
        return this.layersConfig;
    }

    setObjectDepth(object: any, layer?: any) {
        if (layer) {
            object.setDepth(layer);
            return;
        }
        object.setDepth(this.topMostLayer)
    }

    get lowestLayer() {
        return Math.min(...Object.values(this.layers)) + 1;
    }

    get topMostLayer(): number {
        const layerNumber = Math.max(...Object.values(this.layers)) + 1;
        this.addLayer(`layer_${layerNumber}`, layerNumber);
        return layerNumber;
    }
}
