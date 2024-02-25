import { Assets, extensions } from "pixi.js";
import HowlerExtension, { HowlAsset } from "../loaders/howler";

let ready = false;
let music: Howl|undefined;
let pendingMusic: string|undefined

function loadCallback() {
	if (pendingMusic) {
		playMusic(pendingMusic);
		pendingMusic = undefined;
	}
}

async function playMusic(src: string, loopTimestamp?: number) {
	const asset = (await Assets.get(src)) as HowlAsset;
	const howl = asset.howl;

	if (!howl) {
		pendingMusic = src;
		return;
	}

	howl.loop(true);

	if (loopTimestamp) {
		howl.on("end", () => {
			howl.seek(loopTimestamp);
		});
	}

	if (music) {
		music.stop();
	}

	howl.play();
	music = howl;
}

export default {
	get ready() {
		return ready;
	},
	prepare: () => {
		ready = true;
		HowlerExtension.prepare(loadCallback);
	},
	playMusic,
	stopMusic() {
		if (music) {
			music.stop()
		}
	}
};
