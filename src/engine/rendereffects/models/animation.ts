import { Container } from "pixi.js";
import TweenShape from "../../../framework/animations/tween/models/tweenshape";
import { IEngineEvent } from "../../enginesys";
import { Animate } from "./animate";
import { RenderEffect, RenderEffectFlags } from "./renderop";
import { vec3 } from "../../../core/math/models";

export class Animation implements IEngineEvent, RenderEffect {
  eventId: string;
  target: Container;
  property: string;
  value: number | vec3;
  duration: number;
  easing: TweenShape;
  onComplete: Function;
  animating: boolean;
  startingTime: number;
  _startingValue?: number | vec3;
  _renderEffect: RenderEffectFlags;
  //_system: IEngineSystem for animationsys context?

  constructor(target: Container, property: string, value: number | vec3, duration: number, easing: TweenShape, onComplete: Function) {
    this.target = target;
    this.property = property;
    this.value = value;
    this.duration = duration;
    this.easing = easing;
    this.onComplete = onComplete || (() => { });
    this.animating = false;
    this.startingTime = -1;
    this._renderEffect = RenderEffectFlags.RE_NONE;
  }


  static fromAnimate(animate: Animate): Animation {

  }

  getAnimationStartValue(): number | vec3 | undefined {
    return this._startingValue;
  }

  setAnimationStartValue(value: number | vec3) {
    this._startingValue = value;
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
