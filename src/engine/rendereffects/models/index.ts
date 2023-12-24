import { createNamedAnimate } from "..";
import TweenShape from "../../../framework/animations/tween/models";

export * from "./animate";
export * from "./animation";
export * from "./animationlistener";
export * from "./events";
export * from "./renderop";

export const PremadeAnimations = {
    FADE_IN: "Standard_Fade",
    FADE_OUT: "Standard_Fade_REVERSE"
}

const ease = new TweenShape(0, 0.33, 0.67, 1);
createNamedAnimate(PremadeAnimations.FADE_OUT, "alpha", 0, ease);
createNamedAnimate(PremadeAnimations.FADE_IN, "alpha", 1, ease);

