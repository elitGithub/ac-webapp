import { Container } from "pixi.js";
import TweenShape from "../../../framework/animations/tween/models/tweenshape";
import { IEngineEvent } from "../../enginesys";
import { Animate } from "./animate";
import { RenderEffect, RenderEffectFlags } from "./renderop";

export class Animation implements IEngineEvent, RenderEffect {
    target: Container;
    property: string;
    value: number;
    duration: number;
    easing: TweenShape;
    onComplete: Function;
    animating: boolean;
    startingTime: number;
    _renderEffect: RenderEffectFlags;
    //_system: IEngineSystem for animationsys context?

    constructor(target: Container, property: string, value: number, duration: number, easing: TweenShape, onComplete: Function) {
      this.target = target;
      this.property = property;
      this.value = value;
      this.duration = duration;
      this.easing = easing;
      this.onComplete = onComplete || (() => {});
      this.animating = false;
      this.startingTime = -1;
      this._renderEffect = RenderEffectFlags.RE_NONE;
    }

    static fromAnimate(animate: Animate): Animation {

    }

    getRenderEffectMode(): RenderEffectFlags {
      return this._renderEffect;
    }

    setRenderEffectMode(overlay: boolean, override?: boolean | undefined): void {
        let flag = 0;
        if (overlay) {
          flag |= RenderEffectFlags.RE_OVERLAY;
        }

        if (override) {
          flag |= RenderEffectFlags.RE_OVERRIDE;
        }
    }

    setRenderEffectFlags(flags: RenderEffectFlags): void {
      this._renderEffect = flags;
    }
  }
  