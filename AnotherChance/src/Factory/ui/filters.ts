import { ColorMatrixFilter } from "pixi.js";

export const SuperBrightFilter = new ColorMatrixFilter();
SuperBrightFilter.matrix = [
	1,
	0,
	0,
	0,
	0.9, //
	0,
	1,
	0,
	0,
	0.9, // For annoying JS formatters
	0,
	0,
	1,
	0,
	0.9, //
	0,
	0,
	0,
	1,
	0
];

export const HighlightFilter = new ColorMatrixFilter();
HighlightFilter.matrix = [
	1,
	0,
	0,
	0,
	0.15, //
	0,
	1,
	0,
	0,
	0.15, //
	0,
	0,
	1,
	0,
	0.15, //
	0,
	0,
	0,
	1,
	0
];

export const HighlightFilterPlus = new ColorMatrixFilter();
HighlightFilterPlus.matrix = [
	1,
	0,
	0,
	0,
	0.18, //
	0,
	1,
	0,
	0,
	0.18, //
	0,
	0,
	1,
	0,
	0.18, //
	0,
	0,
	0,
	1,
	0
];
