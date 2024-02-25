import UIText from "./text";
import UIPhone from "./phone";
import UIInventory from "./inventory";
import Xray from "./xray";
import Controls from "./controls";
import Layout from "./layout";
import { Assets, Container } from "pixi.js";
import { GameMode, SaveGetter, gameSize, useReadStore, useGameStage } from "src/game/stores/base";
import GameStore from "src/game/stores/base";
import { DateTime } from "luxon";
import { Observable, Subscriber } from "rxjs";
import { UINotify } from "./notification";
import loader from "../player/loader";
import { space } from "./spacing";

let gameContainer: Container;
let gameScreen: Container;
let hud: Container;
let lowerHud: Container;

export const useGameContainer = () => gameContainer;
export const useGameScreen = () => gameScreen;

let day: SaveGetter<number>;
let hour: SaveGetter<number>;
let energy: SaveGetter<number>;
let quest: SaveGetter<string>;
let mode: SaveGetter<GameMode>;
let location: SaveGetter<string>;
let money: SaveGetter<number>;

let phoneActive = false; // TODO: Move this to the store

function acquireStores() {
	const readStore = useReadStore();
	day = readStore.get("day") as SaveGetter<number>;
	hour = readStore.get("hour") as SaveGetter<number>;
	energy = readStore.get("energy") as SaveGetter<number>;
	quest = readStore.get("quest") as SaveGetter<string>;
	mode = readStore.get("mode") as SaveGetter<GameMode>;
	location = readStore.get("location") as SaveGetter<string>;
	money = readStore.get("money") as SaveGetter<number>;
}

async function setupGame() {
	acquireStores();
	const stage = useGameStage();
	stage.removeChildren();

	gameContainer = new Container();
	gameScreen = new Container();

	hud = new Container();
	lowerHud = new Container();

	Controls.sprites(hud, ["hud_top_gradient"]);
	Controls.sprites(lowerHud, ["hud_top_gradient"]);

	lowerHud.y = gameSize.h - lowerHud.height;

	gameContainer.addChild(gameScreen);
	gameContainer.addChild(hud);
	// gameContainer.addChild(lowerHud);

	stage.addChild(gameContainer);

	const locationText = new Observable<string>((setter) => {
		location.subscribe((x) => {
			setter.next(x);
		});
	});

	const timeText = new Observable<string>((setter) => {
		hour.subscribe((_) => updateTime(setter));
		day.subscribe((_) => updateTime(setter));
	});

	const energyText = new Observable<string>((setter) => {
		energy.subscribe((x) => {
			setter.next(`${x}/100`);
		});
	});

	const moneyText = new Observable<string>((setter) => {
		money.subscribe((x) => {
			setter.next(x.toString());
		});
	});

	const questText = new Observable<string>((setter) => {
		quest.subscribe((x) => {
			setter.next("Quest Guide\n" + x);
		});
	});

	const modeText = new Observable<string>((setter) => {
		mode.subscribe((x) => {
			setter.next("Mode:\n" + x);
		});
	});

	Controls.hudButton(
		hud,
		"hud_btn_map",
		{
			y: 30
		},
		locationText,
		undefined, space(64,8,16,8), undefined, testLocations
	);

	// offset += hmap.width + spacing;
	Controls.hudButton(
		hud,
		"hud_btn_time",
		{
			y: 30
		},
		timeText
	);

	let henergy = new Container();

	Controls.sprites(henergy, [
		"hud_bar_back_energy",
		"hud_bar_front_energy",
		"hud_bar_border_energy"
	]);

	henergy = Controls.hudStatus(
		hud,
		henergy,
		energyText,
		{
			xmin: 250,
			xmax: 250,
			ymin: 50,
			ymax: 50
		},
		undefined,
		"hud_energy"
	);
	henergy.y = 30;

	let hmoney = new Container();

	hmoney = Controls.hudStatus(hud, hmoney, moneyText, undefined, undefined, "hud_money");
	const [moneyIcon] = Controls.sprites(hmoney, ["hud_icon_money"]);
	hmoney.y = 30;

	const first = hmoney.children[hmoney.children.length - 2];
	first.x = first.x + moneyIcon.width + 8;
	first.y = first.y + moneyIcon.height / 2;

	Controls.hudButton(
		hud,
		"hud_btn_phone",
		{
			y: 30
		},
		undefined,
		undefined,
		undefined,
		"right",
		showPhone
	);

	Controls.hudButton(
		hud,
		"hud_btn_inventory",
		{
			y: 30
		},
		undefined,
		undefined,
		undefined,
		"right",
		showInventory
	);

	Controls.hudButton(
		hud,
		"hud_btn_game_mode",
		{
			y: 37
		},
		modeText,
		{
			xmin: 100,
			xmax: 600,
			ymin: 50,
			ymax: 50
		},
		undefined,
		"right",
		toggleGameMode
	);

	Controls.hudButton(
		hud,
		"hud_btn_quest_guide",
		{
			y: 37
		},
		questText,
		undefined,
		undefined,
		"right",
		handleQuestGuide
	);

	// Controls.iconButton(lowerHud, "hud_eye_open", toggleHud, {
	// 	x: 30
	// });

	// TODO: Add loading screen or something here
	// await Assets.loadBundle("core");
	console.log("Load complete");

	UIPhone.init();
	UIInventory.init();

	// This is a sample quest dialog. And this is some really really long random dialog text
	// "Very unfortunate. For the beaver. That it ran into me. An apex predator of these lands."

	// UINotify.notifyQuest(
	// 	"Quest started",
	// 	"Smash or Pass",
	// 	"Shut the infernal contraption up. No matter the cost!"
	// );
}

let q = 0;
function handleQuestGuide() {
	if (q++ % 2 == 0) {
		UINotify.notifyQuest("Quest started", "Smash or Pass", "Shut the infernal contraption up. No matter the cost!");
	} else {
		UINotify.nofityAchievement("Devilish unlocked!");
	}

	
}

function testLocations() {
	loader.testNextLocation();
}

function toggleGameMode() {
	GameStore.toggleMode();
}

function toggleHud() {
	console.log("toggle hud");
}

function showPhone() {
	UIPhone.show();
}

function showInventory() {
	UIInventory.show();
}

function updateTime(setter: Subscriber<string>) {
	const d = day.get();
	setter.next(`Day ${d} - ${formatDay()} - ${formatTime()}`);
}

function formatDay() {
	const d = day.get() % 7;

	// TODO: Switch to luxon for global time
	switch (d) {
		case 0:
			return "SUN";
		case 1:
			return "MON";
		case 2:
			return "TUE";
		case 3:
			return "WED";
		case 4:
			return "THU";
		case 5:
			return "FRI";
		case 6:
		default: // Everybody loves a saturday
			return "SAT";
	}
}

function formatTime() {
	const time = DateTime.fromObject({
		hour: hour.get()
	});

	return time.toFormat("hh:mm a");
}

export default {
	xray: Xray.xray,
	...Layout,
	...Controls,

	init: () => {
		UIText.init();
		Xray.init();
	},
	setupGame
};
