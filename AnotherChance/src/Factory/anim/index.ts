import { Assets, Container, DisplayObject, Sprite, Texture, Ticker } from "pixi.js";
import { Easing, Group, Tween } from "tweedle.js";
import { EasingKind, getEaseFn } from "./easing";

interface AnimOptions<T> {
	offset: Partial<T>;
	delay?: number;
	duration?: number;
	easing?: EasingKind;
	yoyo?: boolean;
	repeat?: number;
	stopCb?: CallableFunction;
}

interface StoppablePromise<T = unknown> extends Promise<T> {
	stop: Function;
}

const _groups: Group[] = [Group.shared];

function tween<T>(
	target: T,
	{ offset, duration, delay, easing, yoyo, repeat, stopCb }: AnimOptions<T>
) {
	if (!duration) {
		duration = 1000;
	}

	const tween = new Tween(target).to(offset, duration);

	if (easing) {
		tween.easing(getEaseFn(easing));
	}

	if (delay) {
		tween.delay(delay);
	}

	if (yoyo) {
		tween.yoyo(true);
	}

	if (repeat) {
		tween.repeat(repeat);
	}

	if (stopCb) {
		tween.stop();
	}

	tween.start();
	return promise(tween);
}

// TODO: Modularize the method
function slideshow(container: Container, assets: string[], interval = 1000, fadeDuration = 300) {
	container.sortableChildren = true;

	const sprites: Sprite[] = [];
	let sprite: Sprite;
	const len = assets.length - 1;
	let i = len;

	for (; i >= 0; i--) {
		sprites[i] = sprite = Sprite.from(Texture.from(assets[i]));
		sprite.zIndex = len - i;
		container.addChild(sprite);
	}

	i = 0;
	const intv = setInterval(() => {
		if (i > len) {
			i = 0;
		}

		const top = sprites[i];
		i++;

		tween(top, {
			offset: {
				alpha: 0
			},
			duration: fadeDuration
		}).then(() => {
			for (let x = 0; x <= len; x++) {
				let sprite = sprites[x];
				let z = sprite.zIndex + 1;

				if (z > len) {
					z = 0;
				}

				sprite.zIndex = z;
			}
			top.alpha = 1;
		});
	}, interval);

	return () => clearInterval(intv);
}

function promise(tween: Tween<any>) {
	const promise = new Promise((res, _) => {
		tween.onComplete(res);
	}) as StoppablePromise;

	promise.stop = () => {
		tween.stop();
	};

	return promise;
}

function updateFn() {
	for (const group of _groups) {
		group.update();
	}
}

export default {
	tween,
	slideshow,
	init: () => {
		Ticker.shared.add(updateFn);
	}
};
