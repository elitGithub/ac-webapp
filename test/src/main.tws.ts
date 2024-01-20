import {
	Engine,
	getEngine,
	EngineBus,
	createEngineEvent,
} from "../../src/engine";
import {
	Scene,
	Load_Scene,
	Prep_Scenes,
	Reload_Scene,
	Transition_Scene,
} from "../../src/engine/scene/models";
import { NPC } from "../../src/gameplay/npc";
import SceneTransitionFlags from "../../src/engine/scene/models";
import { HudElement, Popup } from "../../src/engine/gui";
import { BaseGame } from "../../src/gameplay/game";
import { DialogueSystem } from "../../src/gameplay/dialogue";
import * as inventory from "../../src/gameplay/inventory";
import { FiniteResource } from "../../src/gameplay/finiteresource";
import { Container, Graphics, Sprite, Text } from "pixi.js";

import EnergyBarBorder from "../assets/ui/hud/bar_border_energy.webp";
import EnergyBarBack from "../assets/ui/hud/bar_back_energy.webp";
import EnergyBarFront from "../assets/ui/hud/bar_front_energy.webp";
import MoneyIcon from "../assets/ui/hud/icon_money.webp";
import LocationButton from "../assets/ui/hud/btn_map.webp";
import TimeButton from "../assets/ui/hud/btn_time.webp";
import LabelTitleBg from "../assets/ui/frame_objname_gold.webp";
import LabelBodyBg from "../assets/ui/frame_popup.webp";
import SayFrameBg from "../assets/ui/dialog/frame_say_bg.webp";

import ChoiceBg from "../assets/ui/dialog/choice.webp";

import { START_DIALOGUE } from "../../src/gameplay/dialogue";

const ebborder = await getEngine()
	.getAssets()
	.loadTexture({ source: EnergyBarBorder });
const ebback = await getEngine()
	.getAssets()
	.loadTexture({ source: EnergyBarBack });
const ebfront = await getEngine()
	.getAssets()
	.loadTexture({ source: EnergyBarFront });

class TestGame extends BaseGame {
	energy: FiniteResource;
	money: FiniteResource;
	energyHud: EnergyHudElement;
	moneyHud: MoneyHudElement;
	locationHud: LocationHudElement;
	timeHud: TimeHudElement;
	dialogueSys: DialogueSystem;

	constructor(opts: any) {
		super(opts);
		this.createFiniteResource("ENERGY", 100);
		this.createFiniteResource("MONEY", 1000);

		this.energy = this.getFiniteResource("ENERGY")!;
		this.money = this.getFiniteResource("MONEY")!;
		this.money.setResource(69);

		this.locationHud = new LocationHudElement();
		let pos = getEngine().SPR(0.01, 0.025);
		this.locationHud.position.set(pos.x, pos.y);

		this.timeHud = new TimeHudElement();
		pos = getEngine().SPR(0.11, 0.025);
		this.timeHud.position.set(pos.x, pos.y);

		this.energyHud = new EnergyHudElement();
		pos = getEngine().SPR(0.3, 0.05);
		this.energyHud.position.set(pos.x, pos.y);

		this.moneyHud = new MoneyHudElement();
		pos = getEngine().SPR(0.4, 0.025);
		this.moneyHud.position.set(pos.x, pos.y);

		getEngine().getHud().addElementToHud("HUD_LOCATION", this.locationHud);
		getEngine().getHud().addElementToHud("HUD_TIME", this.timeHud);
		getEngine().getHud().addElementToHud("HUD_ENERGY", this.energyHud);
		getEngine().getHud().addElementToHud("HUD_MONEY", this.moneyHud);
		this.dialogueSys = new DialogueSystem();
		getEngine()
			.createSimpleSprite({ source: SayFrameBg })
			.then((sprite) => {
				if (sprite) {
					this.dialogueSys
						.getDialogueHud()
						.setSpeechBackground(sprite);
				}
			});
		getEngine()
			.createSimpleSprite({ source: ChoiceBg })
			.then((sprite) => {
				if (sprite) {
					this.dialogueSys.getDialogueHud().choiceBg = sprite;
				}
			});

		this.clock.start();
	}

	update(time: number): void {
		super.update(time);
		this.locationHud.setLocation(
			getEngine().getScene().getCurrentScene()?.name ?? "pending",
		);
		this.timeHud.setTime(
			`${this.clock.getDayString()} - ${this.clock.getHourString()}:${this.clock.getMinuteString()}`,
		);
		this.energyHud.setEnergy(
			this.energy.getCurrentValue(),
			this.energy.getMaxResource(),
		);
		this.moneyHud.setMoney(this.money.getCurrentValue());
		if (this.energy.getCurrentValue() === 0) {
			EngineBus.emit(Reload_Scene, createEngineEvent(Reload_Scene, {}));
			this.clock.advanceTime(1);
			this.energy.reset();
		}
		this.dialogueSys.update(time);
	}
}

class LocationHudElement extends HudElement {
	icon!: Sprite;
	text: Text;

	constructor() {
		super();
		getEngine()
			.createSimpleSprite({ source: LocationButton })
			.then((sprite) => {
				if (sprite) {
					this.icon = sprite;
					this.addChild(this.icon, this.text);
				}
			});

		this.text = new Text();
		this.text.x = 70;
		this.text.y = 10;
		this.text.scale.set(0.75);
	}

	setLocation(value: string) {
		this.text.text = value;
	}
}
class TimeHudElement extends HudElement {
	icon!: Sprite;
	text: Text;

	constructor() {
		super();
		getEngine()
			.createSimpleSprite({ source: TimeButton })
			.then((sprite) => {
				if (sprite) {
					this.icon = sprite;
					this.addChild(this.icon, this.text);
				}
			});

		this.text = new Text();
		this.text.x = 25;
		this.text.y = 10;
		this.text.scale.set(0.75);
	}

	setTime(value: string) {
		this.text.text = value;
	}
}

class MoneyHudElement extends HudElement {
	icon!: Sprite;
	text: Text;

	constructor() {
		super();
		getEngine()
			.createSimpleSprite({ source: MoneyIcon })
			.then((sprite) => {
				if (sprite) {
					this.icon = sprite;
					this.addChild(this.icon);
				}
			});
		this.text = new Text();
		this.text.x = 60;
		this.text.y = 10;
		this.addChild(this.text);
	}

	setMoney(value: number) {
		this.text.text = `${value}`;
	}
}
class EnergyHudElement extends HudElement {
	border: Sprite;
	back: Sprite;
	front: Sprite;
	barMask: Graphics;
	text: Text;

	constructor() {
		super();
		this.border = Sprite.from(ebborder!.texture);
		this.back = Sprite.from(ebback!.texture);
		this.front = Sprite.from(ebfront!.texture);

		this.border.anchor.set(0.5);
		this.back.anchor.set(0.5);
		this.front.anchor.set(0.5);

		this.border.setTransform(0, 0, 1, 1);
		this.back.setTransform(0, 0, 1, 1);
		this.front.setTransform(0, 0, 1, 1);

		this.barMask = new Graphics();

		this.barMask.beginFill(0xffffff);
		this.barMask.drawRect(0, 0, this.back.width, this.back.height);
		this.barMask.endFill();

		this.barMask.setTransform(-150, -50, 1, 1);

		const energyContainer = new Container();
		energyContainer.mask = this.barMask;
		energyContainer.addChild(this.barMask);
		energyContainer.addChild(this.front);

		energyContainer.setTransform(0, 0, 1, 1);

		this.text = new Text();
		this.text.x = -50;
		this.text.y = -20;
		this.addChild(this.border, this.back, energyContainer, this.text);
	}

	setEnergy(value: number, maxValue: number) {
		//this.barMask.clear();
		//this.barMask.beginFill(0xffffff);
		//this.barMask.drawRect(0, 0, this.back._width * (value/maxValue), this.back._height);
		//this.barMask.endFill();
		//this.barMask.setTransform(-150,-50,1,1);
		this.text.text = `${value} / ${maxValue}`;
	}
}

class InteractableDescription extends Popup {
	displayName: string;
	description: string;
	titleBg: Sprite;
	bodyBg: Sprite;
	titleText: Text;
	bodyText: Text;

	constructor(displayName: string, description: string) {
		super();

		this.displayName = displayName;
		this.description = description;
		this.sortableChildren = true;

		getEngine()
			.createSimpleSprite({ source: LabelTitleBg })
			.then((sprite) => {
				if (sprite) {
					this.titleBg = sprite;
					this.titleBg.position.set(150, 0);
					this.addChild(this.titleBg, this.titleText);
				}
			});

		getEngine()
			.createSimpleSprite({ source: LabelBodyBg })
			.then((sprite) => {
				if (sprite) {
					this.bodyBg = sprite;
					this.bodyBg.position.set(0, 40);
					this.bodyBg.zIndex = -1;
					this.bodyBg.visible = false;
					this.addChild(this.bodyBg, this.bodyText);
				}
			});

		this.titleText = new Text(this.displayName);
		this.titleText.x = 230;
		this.titleText.y = 20;
		this.bodyText = new Text(this.description);
		this.bodyText.x = 100;
		this.bodyText.y = 100;
		this.bodyText.visible = false;
	}

	show() {
		this.titleText.visible = true;
		if (this.description) {
			this.bodyText.visible = true;
		}

		if (this.titleBg) {
			this.titleBg.visible = true;
		}

		if (this.bodyBg && this.description) {
			this.bodyBg.visible = true;
		}
		super.show();
	}

	hide() {
		this.titleText.visible = false;
		this.bodyText.visible = false;
		if (this.titleBg) {
			this.titleBg.visible = false;
		}

		if (this.bodyBg) {
			this.bodyBg.visible = false;
		}
		super.hide();
	}
}

Engine.init(new TestGame());

const div = document.createElement("div");
const app = document.getElementById("app");
if (app) {
	app.append(div);
} else {
	document.body.append(div);
}
getEngine().getRender().attachRendererTo(div);

//interactables

//bedroom
import Bedroom from "../assets/locations/home/bedroom/bedroom.webp";
import BedroomDoor from "../assets/locations/home/bedroom/door.webp";
import BedroomBed from "../assets/locations/home/bedroom/bed.webp";
import BedroomTV from "../assets/locations/home/bedroom/tv.webp";
import BedroomAlarm from "../assets/locations/home/bedroom/alarm.webp";
import BedroomIsabelleSprite from "../assets/locations/home/bedroom/isabelle.webp";

import HomeHall from "../assets/locations/home/hall/homehall.webp";
import HomeHallDoor from "../assets/locations/home/hall/door_right.webp";
import HomeHallBathroomDoor from "../assets/locations/home/hall/door_white.webp";

import BathRoom from "../assets/locations/home/bathroom/bathroom.webp";
import BathRoomDoor from "../assets/locations/home/bathroom/door.webp";

//scene

const BathroomScene = new Scene("BathroomScene", { source: BathRoom });
const HomeHallScene = new Scene("HomeHallScene", { source: HomeHall });
const BedroomScene = new Scene("BedroomScene", { source: Bedroom });
//BedroomScene.setTransform(0, 50);

//npcs

const isabelle = new NPC("Isabelle");

//interactable

const bathroomToHallDoor = await getEngine().createSimpleSceneInteractable(
	"bathroom_door",
	{
		action: "interact",
		handler: () => {
			EngineBus.emit(
				Transition_Scene,
				createEngineEvent(Transition_Scene, {
					sceneName: "HomeHallScene",
					sceneTransition: SceneTransitionFlags.ST_FADE,
				}),
			);
			getEngine().getGame().energy.decrement(10);
		},
	},
	{ source: BathRoomDoor },
	BathroomScene,
);
bathroomToHallDoor.anchor.set(0.5);
let pos = getEngine().SPR(0.203, 0.425);
bathroomToHallDoor.setTransform(pos.x, pos.y);

// HallToBedroomDoor

const HallToBedroomDoor = await getEngine().createSimpleSceneInteractable(
	"hall_door",
	{
		action: "interact",
		handler: () => {
			EngineBus.emit(
				Transition_Scene,
				createEngineEvent(Transition_Scene, {
					sceneName: "BedroomScene",
					sceneTransition: SceneTransitionFlags.ST_FADE,
				}),
			);
			getEngine().getGame().energy.decrement(10);
		},
	},
	{ source: HomeHallDoor },
	HomeHallScene,
);
HallToBedroomDoor.setTransform(1512, 63);

//Bathroom Door

const HallToBathroomDoor = await getEngine().createSimpleSceneInteractable(
	"bathroom_door",
	{
		action: "interact",
		handler: () => {
			EngineBus.emit(
				Transition_Scene,
				createEngineEvent(Transition_Scene, {
					sceneName: "BathroomScene",
					sceneTransition: SceneTransitionFlags.ST_FADE,
				}),
			);
			getEngine().getGame().energy.decrement(10);
		},
	},
	{ source: HomeHallBathroomDoor },
	HomeHallScene,
);
pos = getEngine().SPR(0.72, 0.42);
HallToBathroomDoor.setTransform(1328, 235);

//Bedroom Isabelle

const BedroomIsabelle = await getEngine().createSimpleSceneInteractable(
	"bedroom_isabelle",
	{
		action: "interact",
		handler: () => {
			EngineBus.emit(
				Transition_Scene,
				createEngineEvent(Transition_Scene, {
					sceneName: "BathroomScene",
					sceneTransition: SceneTransitionFlags.ST_FADE,
				}),
			);
			getEngine().getGame().energy.decrement(10);
		},
	},
	{ source: BedroomIsabelleSprite },
	BedroomScene,
);
BedroomIsabelle.setTransform(901, 411);

const BedroomDoorInt = await getEngine().createSimpleSceneInteractable(
	"bedroom_door",
	{
		action: "interact",
		handler: () => {
			EngineBus.emit(
				Transition_Scene,
				createEngineEvent(Transition_Scene, {
					sceneName: "HomeHallScene",
					sceneTransition: SceneTransitionFlags.ST_FADE,
				}),
			);
			getEngine().getGame().energy.decrement(10);
		},
	},
	{ source: BedroomDoor },
	BedroomScene,
);
BedroomDoorInt.setTransform(736, 398); //736,407

const BedroomBedInt = await getEngine().createSimpleSceneInteractable(
	"bedroom_door",
	{
		action: "interact",
		handler: () => {
			EngineBus.emit(
				Transition_Scene,
				createEngineEvent(Transition_Scene, {
					sceneName: "BedroomScene",
					sceneTransition: SceneTransitionFlags.ST_FADE,
				}),
			);
			getEngine().getGame().energy.decrement(10);
		},
	},
	{ source: BedroomBed },
	BedroomScene,
);
BedroomBedInt.setTransform(315, 539);

const BedroomTVInt = await getEngine().createSimpleSceneInteractable(
	"bedroom_door",
	{
		action: "interact",
		handler: () => {
			EngineBus.emit(
				Transition_Scene,
				createEngineEvent(Transition_Scene, {
					sceneName: "BedroomScene",
					sceneTransition: SceneTransitionFlags.ST_FADE,
				}),
			);
			getEngine().getGame().energy.decrement(10);
		},
	},
	{ source: BedroomTV },
	BedroomScene,
);
BedroomTVInt.setTransform(148, 630);

const BedroomAlarmInt = await getEngine().createSimpleSceneInteractable(
	"bedroomAlarmClock",
	{
		action: "interact",
		handler: () => {
			EngineBus.emit(
				START_DIALOGUE,
				createEngineEvent(START_DIALOGUE, {
					dialogueId: "QuestOneAlarmClockDialogue",
				}),
			);
			getEngine().getGame().energy.decrement(10);
		},
	},
	{ source: BedroomAlarm },
	BedroomScene,
);
BedroomAlarmInt.setTransform(305, 704);

/*bathroomToHallDoor.setLabel(
	new InteractableDescription(hallScene.name, "Da Hall"),
);*/

EngineBus.emit(
	Prep_Scenes,
	createEngineEvent(Prep_Scenes, {
		scenes: [BathroomScene, HomeHallScene, BedroomScene],
	}),
);

import { functionOne } from "./quests/questOne";
functionOne();

EngineBus.emit(
	Transition_Scene,
	createEngineEvent(Transition_Scene, {
		sceneName: "BedroomScene",
		sceneTransition: SceneTransitionFlags.ST_FADE,
	}),
);
