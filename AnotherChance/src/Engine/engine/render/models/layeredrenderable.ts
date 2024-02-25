import { Container } from "@pixi/display";
import { IRenderableResource } from "../../../framework/graphics/interfaces/irenderableresource";
import { Sprite, Texture, Transform } from "pixi.js";

type Layer = {
    z: number,
    layer: Container,
}

export class LayeredRenderable extends Container {

    layers: Layer[];

    constructor() {
        super();
        this.layers = [];
        this.sortableChildren = true;
    }

    addLayerTexture(layerNum: number, layer: IRenderableResource, transform?: Transform): Sprite {
        const texture = AssetsLoader.load(layer) as Texture;
        const spriteLayer = Sprite.from(texture);
        spriteLayer.zIndex = layerNum;
        if (transform)
        {
            spriteLayer.setTransform(transform.position.x, 
                transform.position.y, 
                transform.scale.x, 
                transform.scale.y, 
                transform.rotation, 
                transform.skew.x, 
                transform.skew.y, 
                transform.pivot.x, 
                transform.pivot.y);
        };
        
        this.addChild(spriteLayer);
        this.layers.push({z: layerNum, layer: spriteLayer});

        return spriteLayer;
    }

    addLayerContainer(layerNum: number, layer: Container, transform: Transform): Container {
        layer.zIndex = layerNum;
        if (transform)
        {
            layer.setTransform(transform.position.x, 
                transform.position.y, 
                transform.scale.x, 
                transform.scale.y, 
                transform.rotation, 
                transform.skew.x, 
                transform.skew.y, 
                transform.pivot.x, 
                transform.pivot.y);
        };
        this.addChild(layer);
        this.layers.push({z: layerNum, layer});

        return layer;
    }
    
}