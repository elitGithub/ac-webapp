import { Container } from "pixi.js";
import { gameCenter } from "../stores/base";

function scaleH(disp: Container, height: number) {
	const scale = height / disp.height;
	const width = disp.width * scale;

	disp.height = height;
	disp.width = width;
}

function scaleW(disp: Container, width: number) {
	const scale = width / disp.width;
	const height = disp.height * scale;

	disp.height = height;
	disp.width = width;
}

function globalCenter(el: Container) {
	const x = gameCenter.x - el.width / 2;
	const y = gameCenter.y - el.height / 2;
	el.position.set(x, y);

	return el;
}

function center(el: Container, width?: number, height?: number) {
	width ??= el.parent.width;
	height ??= el.parent.height;

	const x = width / 2 - el.width / 2;
	const y = height / 2 - el.height / 2;
	el.position.set(x, y);

	return el;
}

function centerX(el: Container, width?: number, padL?: number, padR?: number) {
	width ??= el.parent.width;

	padL ??= 0;
	padR ??= 0;

	const fw = padL + el.width + padR;
	const spaceRem = width - fw;

	console.log(fw, spaceRem, padL, padL + spaceRem / 2);

	// const x = width / 2 - el.width / 2;
	const x = padL + spaceRem / 2;
	el.position.set(x, el.y);

	return el;
}

function centerY(el: Container, height?: number, padT?: number, padB?: number) {
	height ??= el.parent.height;
	padT ??= 0;
	padB ??= 0;

	const fh = padT + el.height + padB;
	const spaceRem = height - fh;

	const y = padT + spaceRem / 2; //height / 2 - el.height / 2;
	el.position.set(el.x, y);

	return el;
}

function constrain(value: number, min?: number, max?: number) {
	min ??= value;
	max ??= value;

	if (value < min) {
		value = min;
	} else if (value > max) {
		value = max;
	}

	return value;
}

export default { scaleH, scaleW, constrain, center, centerX, centerY, globalCenter };
