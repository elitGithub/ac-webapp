import { Container } from "pixi.js";
import TweenShape from "../../../framework/animations/tween/models/tweenshape";
import { IEngineEvent } from "../../enginesys";

class Animation implements IEngineEvent {
    target: Container;
    property: string;
    value: number;
    duration: number;
    easing: TweenShape;
    onComplete: Function;
    animating: boolean;
    startingTime: number;
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
    }
  }
  