import { Container, Graphics, Sprite, graphicsUtils } from "pixi.js";
import { useGameScreen } from "../ui";
import type { Character, Expr, GameItem, GameLocation, LocationItem, Transcript } from "./types";
import { UIControl } from "../ui/controls";
import UIText from "../ui/text"
import { compute } from "../expr";
import { HighlightFilter, HighlightFilterPlus } from "../ui/filters";
import AlphaHitArea from "../util/alphaHitArea";
import { space } from "../ui/spacing";
import Anim from  "src/game/anim"

const scenes = new Map<string, Transcript>();
const chars = new Map<string, Character>();
const locations = new Map<string, GameLocation>();
const items = new Map<string, GameItem>(); 

const sceneNameRegex = /[0-9]+_([A-Za-z_]+)/;
const nameRegex = /([A-Za-z_]+)/;

function extractSceneName(path: string) {
	const chunks = path.split("/");
	const name = chunks[chunks.length - 1];

	const res = sceneNameRegex.exec(name);
	if (!res) {
		return name;
	}

	return res[1];
}

function extractName(path: string) {
	const chunks = path.split("/");
	const name = chunks[chunks.length - 1];

	const res = nameRegex.exec(name);
	if (!res) {
		return name;
	}

	return res[1];
}

async function loadLocations() {
	const payloads = import.meta.glob("../../transcript/locations/*.json");

	for (const path of Object.keys(payloads)) {
		const name = extractName(path);
		const loc = (await payloads[path]()) as any;

		locations.set(name, loc.default as any);
	}
}

async function loadChars() {
	const payloads = import.meta.glob("../../transcript/characters/*.json");

	for (const path of Object.keys(payloads)) {
		const name = extractName(path);
		const char = (await payloads[path]()) as any;

		chars.set(name, char.default as any);
	}
}

async function loadScenes() {
	const payloads = import.meta.glob("src/transcript/scenes/*.json");

	for (const path of Object.keys(payloads)) {
		const name = extractSceneName(path);
		const scene = (await payloads[path]()) as any;

		scenes.set(name, scene.default as any);
	}
}

async function loadItems() {
	const payload = await import("src/transcript/items.json");
	const jitems = payload.default;

	for (const item of jitems) {
		items.set(item.name, item);
	}
}

async function loadLocation(location: string) {
	const loc = locations.get(location);
	if (!loc) {
		throw new Error(`Location does not exist ${location}`);
	}
	

	const nameChunks = loc.name.split('_').splice(1)
	let name = "";

	if (nameChunks.length >= 1) {
		name = nameChunks.join('_');
	} else {
		name = loc.name;
	}


	

	// const name = nameChunks.join('_');//location.toLowerCase();
	const gsc = useGameScreen();
	gsc.removeChildren();

	const scene = UIControl.container();
	scene.alpha =0;

	for (const item of loc.items) {
		try {
			if ("$e" in item) {
				processItemExpr(item, scene, name, loc.name);
			} else {
				loadItem(scene, name, item, loc.name);
			}
		} catch {}
	}

	gsc.addChild(scene);

	import("src/game/stores/base").then((store) => {
		store.default.setLocationName(loc.title);
	})

	// Slight delay to prevent lag.
	// TODO: Improve this line
	// await new Promise((resolve) => setTimeout(resolve, 500));
	Anim.tween(scene, {
		offset: {
			alpha: 1
		},
		duration: 500,
		delay: 500,
		easing: "easeIn"
	});
}

function processItemExpr(eitem: Expr<LocationItem>, scene: Container, name: string, fullName: string) {
	try {
		const localRegex = /(\$_)([a-z_]+)/g;
		const szExpr = eitem.$e.replace(localRegex, (a, b, c) => {
			return `$locs_${fullName}_${c}`;
		});

		const res = compute(szExpr) == true;
		const values = res ? eitem.values : eitem.else;

		for (const eitem of values ?? []) {
			loadItem(scene, name, eitem, fullName);
		}

		if (eitem.and && eitem.and.length > 0 && res) {
			for (const combo of eitem.and) {
				processItemExpr(combo, scene, name, fullName);
			}
		}

		if (eitem.or && eitem.or.length > 0 && !res) {
			for (const alt of eitem.or) {
				processItemExpr(alt, scene, name, fullName);
			}
		}
	} catch (err) {
		console.error(err)
	}


}

function loadItem(scene: Container, location: string, item: LocationItem, fullLocationName: string) {
	try {
		if (!item || !item.name) {
			return;
		}

		const key = `${location}_${item.name}`;
		const fkey = `${fullLocationName}_${item.name}`
		const coord = item.coord;

		
		const rec = items.get(fkey);
		let interactable = false;

		if (rec) {
			interactable = rec.isInteractable;
		}
		let sprite: Sprite;

		try {
			sprite = Sprite.from(key);
		} catch {
			sprite = Sprite.from(item.name)
		}


		sprite.position.set(coord[0], coord[1]);
		scene.addChild(sprite);
		
		if (interactable) {
			sprite.eventMode = "dynamic";
			sprite.hitArea = AlphaHitArea.create(sprite);

			// TODO: Just for the demo. Don't judge me :(
			scene.sortableChildren = true;
			const label = UIText.textSprite(
				scene,
				rec?.title ?? item.name,
				"label_title",
				undefined,
				space(45, 14, 45, 34)
			);

			label.zIndex = 9999;
			let lx = sprite.x - label.width / 2 + sprite.width / 2;
			let ly = sprite.y - (label.height + 20);

			// TODO: More hacky code to change
			if (lx < 0) {
				lx = 50;
			}

			if (ly < 0) {
				ly = 200;
			}


			label.alpha = 0;
			label.position.set(lx, ly)
			
			// sprite.on("pointerover", handleInteractableOver);

			sprite.onpointerover = () => {
				sprite.filters = [HighlightFilter]; 

				Anim.tween(label, {
					offset: {
						alpha: 1
					},
					duration: 200
				});
			};

			sprite.onpointerleave = () => {
				sprite.filters = [];

				Anim.tween(label, {
					offset: {
						alpha: 0
					},
					duration: 200
				});
			};
		}		

	} catch (err) {
		console.error(err)
	}
}

// function handleInteractableOver(ev: FederatedEvent) {
// 	console.log(handleInteractableOver);
// }

let n = 0;

export default {
	init: async () => {
		try {
			loadChars();
			loadLocations();
			loadScenes();
			loadItems();
		} catch (err) {
			console.error(err);
		}
	},
	loadLocation,
	testNextLocation: () => {
		if (n >= locations.size) {
			n = 0;
		}

		const loc = [...locations.entries()][n++];
		loadLocation(loc[0]);
	}
};
