import { Application } from "pixi.js";
import Stim from "../stim";
import { playSplashScene } from "../../scenes";
import { Readable } from "./impl/types";
import { writable } from "./impl";

export type GameMode = "EXPLORE" | "FAST";
// type XrayMode = "OFF" | "ON" | "FULL";
export enum XrayMode {
	OFF = "OFF",
	ON = "ON",
	FULL = "FULL"
}

interface ItemGroup {
	name: string;
	count: number;
}

interface GameStat {
	name: string;
	value: number;
	// TODO: Add perks
}

type GameMessageKind = "text" | "image";
interface GameMessage {
	value: string; // TODO: Dynamically load required asset
	kind: GameMessageKind;
}

interface CharacterDetail {
	stats: GameStat[];
	messages: GameMessage[];
}

const defaults = {
	width: 1920,
	height: 1080
};

// TODO: Always go home by 7pm
// TODO: Add messages to savables
const savables = {
	day: 1,
	hour: 7,
	money: 0,
	energy: 100,
	season: 1,
	mode: "EXPLORE" as GameMode,
	xray: XrayMode.OFF,
	skipping: false,
	quest: "Off",
	location: "Bedroom",
	quests: [] as string[],
	items: [] as ItemGroup[],
	feats: [] as string[],
	replays: [] as string[],
	contacts: [] as string[],
	stats: [] as GameStat[], // TODO: Could be a simple getter, since stats can be stored in characters too
	chars: new Map<string, CharacterDetail>(),
	locs: new Map<string, Set<string>>()
};

type SavableKey = keyof typeof savables;
type SavableValue = (typeof savables)[SavableKey];
type SubscribeFn<T = SavableValue> = Readable<T>["subscribe"];
export type SaveGetter<T = SavableValue> = {
	get: () => T;
	subscribe: SubscribeFn<T>;
};

type ReadStore = Record<string, SaveGetter>;
// type SavableStore = Record<SavableKey, (val: SavableValue) => void>;
type SavableStore = {
	[P in keyof typeof savables]: (val: (typeof savables)[P]) => void;
};

const store = {} as SavableStore;

// const store = new Map<string, Writable>();
// export const readStore = {} as ReadStore;
const readStore = new Map<SavableKey, SaveGetter>();

for (const szKey of Object.keys(savables)) {
	const key = szKey as SavableKey;

	function get() {
		return savables[key as SavableKey];
	}

	function set(val: SavableValue) {
		savables[key as SavableKey] = val as never;
		setter.set(val);
	}

	// TODO: Add a debounce fn here to save to storage
	const value = get();
	const setter = writable(value);

	store[key] = set;
	readStore.set(key, {
		get,
		subscribe: setter.subscribe
	});
}

const state = {
	width: defaults.width,
	height: defaults.height,
	...savables
};

let _app: Application;

export const gameSize = { w: defaults.width, h: defaults.height };
export const gameCenter = { x: gameSize.w / 2, y: gameSize.h / 2 };

export const useRenderer = () => _app.renderer;
export const useGameStage = () => _app.stage;
export const useReadStore = () => readStore;

function handleResize() {
	const doc = document.documentElement;
	const appStyle = _app.view.style as CSSStyleDeclaration;

	if (!appStyle) {
		return;
	}

	const { width, height } = defaults;
	const sw = Math.max(doc.clientWidth, window.innerWidth || 0);
	const sh = Math.max(doc.clientHeight, window.innerHeight || 0);

	const scale = Math.min(sw / width, sh / height);

	const w = Math.floor(scale * width);
	const h = Math.floor(scale * height);
	const mx = (sw - w) / 2;
	const my = (sh - h) / 2;

	appStyle.width = `${w}px`;
	appStyle.height = `${h}px`;
	appStyle.marginLeft = appStyle.marginRight = `${mx}px`;
	appStyle.marginTop = appStyle.marginBottom = `${my}px`;

	state.width = w;
	state.height = h;
}

export default {
	init() {
		const { width, height } = defaults;

		_app = new Application({
			view: document.getElementById("app-canvas") as HTMLCanvasElement,
			resolution: window.devicePixelRatio ?? 1,
			autoDensity: true,
			backgroundColor: 0x000000,
			width,
			height
		});

		_app.start();
		_app.stage.sortableChildren = true; // TODO: Remove this and use base container

		// TODO: Use resize to
		window.addEventListener("resize", handleResize);
		handleResize();

		Stim.init();
		playSplashScene();
	},
	toggleMode() {
		if (savables.mode == "EXPLORE") {
			store.mode("FAST");
		} else {
			store.mode("EXPLORE");
		}
	},
	setLocationName(name: string) {
		store.location(name);
	}
};
