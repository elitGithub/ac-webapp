import { Howl } from "howler";
import { ExtensionType, LoaderParserPriority, utils } from "pixi.js";

type PromiseResolve = (value: unknown) => void;
type PromiseReject = (reason?: any) => void;

interface Callback {
	url: string;
	res: PromiseResolve;
	rej: PromiseReject;
}

export interface HowlAsset {
	url: string;
	howl: Howl;
}

let ready = false;
const callbacks: Callback[] = [];
const pending: HowlAsset[] = [];

let loadCallback: CallableFunction|undefined;

function test(url: string) {
	const ext = utils.path.extname(url)?.trim();

	switch (ext) {
		case ".mp3":
		case ".wav":
		case ".ogg":
			return true;
	}
	return false;
}

function load(url: string) {
	const asset = {
		url
	} as HowlAsset;

	if (!ready) {
		pending.push(asset);
		return asset;
	}

	return loadInternal(asset);
}

function unload(asset: HowlAsset) {
	const n = pending.indexOf(asset);
	if (n >= 0) {
		pending.splice(n, 1);
	}

	if (asset.howl) {
		try {
			asset.howl.unload();
		} catch (err) {
			console.error("Howl Unload failed", err);
		}
	}
}

function loadInternal(asset: HowlAsset) {
	const url = asset.url;

	// TODO: Known issue IDM prevents howler from starting properly. To research and fix during testing
	return new Promise((res, rej) => {
		asset.howl = new Howl({
			src: url,
			onload: () => res(asset),
			onloaderror: (id, msg) => {
				console.error("Howl load failed", id, msg, url);
				rej(msg);
			}
		});

		if (loadCallback) {
			loadCallback();
		}
	});
}

async function prepareAssets(lcb: CallableFunction) {
	ready = true;
	loadCallback = lcb;
	for (const asset of pending) {
		await loadInternal(asset);
	}
}

export default {
	type: ExtensionType.LoadParser,
	name: "Howler Extension",
	priority: LoaderParserPriority.Normal,
	ref: {
		test,
		load,
		unload
	},
	prepare: prepareAssets
};
