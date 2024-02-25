import { Sprite, IHitArea, Rectangle, Texture } from "pixi.js";
import { useRenderer } from "../stores/base";

function create(sprite: Sprite, minAlpha = 255): IHitArea {
  const pixels = useRenderer().extract.pixels(sprite);

  return {
    contains: (x: number, y: number) => isOpaque(x, y, minAlpha, sprite, pixels)
  }
}

function isOpaque(x: number, y: number, minAlpha: number, sprite: Sprite, pixels: Uint8Array|Uint8ClampedArray) {
  const xFrame = sprite.texture.frame;
  const frame = new Rectangle(xFrame.x, xFrame.y, Math.abs(xFrame.width), Math.abs(xFrame.height));

  const w = frame.width;
  const h = frame.height;


  if (w == 0 || h == 0) {
    return false;
  }

  if (x < 0 || x > w) {
    return false;
  }

  if (y < 0 || y > h) {
    return false;
  }

  x = Math.round(x)
  y = Math.round(y)
  const n = (x + y * w) * 4;

  return pixels[n+3] >= minAlpha;
}

function getColor(r: number, g: number, b: number, a: number) {
  return "0x" + a.toString(16) + r.toString(16) + g.toString(16) + b.toString(16)
}

export const AlphaHitArea = {
  create
}

export default AlphaHitArea;