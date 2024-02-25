import { Easing } from "tweedle.js";

export type EasingKind =
	| "linear"
	| "step"
	| "ease"
	| "easeIn"
	| "easeOut"
	| "cubicIn"
	| "cubicOut"
	| "cubicInOut"
	| "quadIn"
	| "quadOut"
	| "quadInOut"
	| "quartIn"
	| "quartOut"
	| "quartInOut"
	| "quinticIn"
	| "quinticOut"
	| "quinticInOut"
	| "sinsoidalIn"
	| "sinsoidalOut"
	| "sinsoidalInOut"
	| "exponentialIn"
	| "exponentialOut"
	| "exponentialInOut"
	| "circularIn"
	| "circularOut"
	| "circularInOut"
	| "elasticIn"
	| "elasticOut"
	| "elasticInOut"
	| "backIn"
	| "backOut"
	| "backInOut"
	| "bounceIn"
	| "bounceOut"
	| "bounceInOut";

/////////////////////////////////////////////////////////////////////////////////////////
// RenPy animation port to reproduce game experience on the web

function Ease(x: number) {
	return 0.5 - Math.cos(Math.PI * x) / 2.0;
}

function EaseIn(x: number) {
	return Math.cos(((1.0 - x) * Math.PI) / 2.0);
}

function EaseOut(x: number) {
	return 1.0 - Math.cos((x * Math.PI) / 2.0);
}

function Elastic(t: number) {
	if (t < 0.5) {
		return ElasticEaseOut(t * 2) / 2;
	} else {
		return 1 - ElasticEaseOut((1 - t) * 2.0) / 2;
	}
}

function ElasticEaseIn(t: number) {
	const p = 0.3; // Period. It ranges 0.1 (spring many) ~ 1.0 (spring once).
	return 1 + Math.pow(2, -10 * t) * Math.sin(((t - p / 4.0) * (2.0 * Math.PI)) / p);
}

function ElasticEaseOut(t: number) {
	return 1 - ElasticEaseIn(t);
}

function BackEaseIn(t: number) {
	return 1 - BackEaseOut(1 - t);
}

function BackEaseOut(t: number) {
	const s = 1.7015; // Overshoot. It ranges .0 (swing 0%) ~ 8.4435 (swing 100%).
	return t * t * ((s + 1) * t - s);
}
/////////////////////////////////////////////////////////////////////////////////////////

export function getEaseFn(fn: EasingKind) {
	switch (fn) {
		default:
			return Easing.Linear.None;

		case "step":
			return Easing.Step.None;

		case "ease":
			return Ease;
		case "easeIn":
			return EaseIn;
		case "easeOut":
			return EaseOut;

		case "cubicIn":
			return Easing.Cubic.In;
		case "cubicOut":
			return Easing.Cubic.Out;
		case "cubicInOut":
			return Easing.Cubic.InOut;

		case "quadIn":
			return Easing.Quadratic.In;
		case "quadOut":
			return Easing.Quadratic.Out;
		case "quadInOut":
			return Easing.Quadratic.InOut;

		case "quartIn":
			return Easing.Quartic.In;
		case "quartOut":
			return Easing.Quartic.Out;
		case "quartInOut":
			return Easing.Quartic.InOut;

		case "quinticIn":
			return Easing.Quintic.In;
		case "quinticOut":
			return Easing.Quintic.Out;
		case "quinticInOut":
			return Easing.Quintic.InOut;

		case "sinsoidalIn":
			return Easing.Sinusoidal.In;
		case "sinsoidalOut":
			return Easing.Sinusoidal.Out;
		case "sinsoidalInOut":
			return Easing.Sinusoidal.InOut;

		case "exponentialIn":
			return Easing.Exponential.In;
		case "exponentialOut":
			return Easing.Exponential.Out;
		case "exponentialInOut":
			return Easing.Exponential.InOut;

		case "circularIn":
			return Easing.Circular.In;
		case "circularOut":
			return Easing.Circular.Out;
		case "circularInOut":
			return Easing.Circular.InOut;

		case "elasticIn":
			return ElasticEaseIn;
		case "elasticOut":
			return ElasticEaseOut;
		case "elasticInOut":
			return Easing.Elastic.InOut;

		case "backIn":
			return BackEaseIn;
		case "backOut":
			return BackEaseOut;
		case "backInOut":
			return Easing.Back.InOut;

		case "bounceIn":
			return Easing.Bounce.In;
		case "bounceOut":
			return Easing.Bounce.Out;
		case "bounceInOut":
			return Easing.Bounce.InOut;
	}
}
