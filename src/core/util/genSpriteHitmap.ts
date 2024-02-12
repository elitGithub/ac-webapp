import { BaseTexture, IAutoDetectOptions, Resource } from "pixi.js";

export function genHitmap(baseTex: BaseTexture<Resource, IAutoDetectOptions>, threshold: number) {
    //check sprite props
    if (!baseTex.resource) {
        //renderTexture
        return false;
    }
    const imgSource = baseTex.resource.source;
    let canvas = null;
    if (!imgSource) {
        return false;
    }
    let context = null;
    if (imgSource.getContext) {
        canvas = imgSource;
        context = canvas.getContext('2d');
    } else if (imgSource instanceof Image || imgSource instanceof ImageBitmap) {
        canvas = document.createElement('canvas');
        canvas.width = imgSource.width;
        canvas.height = imgSource.height;
        context = canvas.getContext('2d');
        context.drawImage(imgSource, 0, 0);
    } else {
        //unknown source;
        return false;
    }

    const w = canvas.width, h = canvas.height;
    console.log(w, h);
    let imageData = context.getImageData(0, 0, w, h);
    //create array
    let hitmap = baseTex.hitmap = new Uint32Array(Math.ceil(w * h / 32));
    //fill array
    for (let i = 0; i < w * h; i++) {
        //lower resolution to make it faster
        let ind1 = i % 32;
        let ind2 = i / 32 | 0;        
        //check every 4th value of image data (alpha number; opacity of the pixel)
        //if it's visible add to the array
        if (imageData.data[i * 4 + 3] >= threshold) {
            hitmap[ind2] = hitmap[ind2] | (1 << ind1);
            // console.log(`hitmap[${ind2}]:`, hitmap[ind2]);
        }
    }
    return true;
}