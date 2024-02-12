import { Engine, EngineBus, createEngineEvent, getEngine } from "../../src/engine";
import { Prep_Scenes, Reload_Scene, Transition_Scene } from "../../src/engine/scene/models/events";
import { Scene } from "../../src/engine/scene/models/scene";
import SceneTransitionFlags from "../../src/engine/scene/models/scenetransitions";
import {BaseGame} from "../../src/gameplay/game";
import BathRoom from "./assets/locations/home/bathroom/bathroom.webp";
import HomeHall from "./assets/locations/home/hall/homehall.webp";
import BathRoomDoor from "./assets/locations/home/bathroom/door.webp";
import HallBathroomDoor from "./assets/locations/home/hall/door_white.webp";
import HallStairs from "./assets/locations/home/hall/stairs.webp";
import Kitchen from "./assets/locations/home/kitchen/kitchen.webp";
import KitchenStairs from "./assets/locations/home/kitchen/stairs.webp";
import { FiniteResource } from "../../src/gameplay/finiteresource";
import EnergyBarBorder from "./assets/ui/hud/bar_border_energy.webp";
import EnergyBarBack from "./assets/ui/hud/bar_back_energy.webp";
import EnergyBarFront from "./assets/ui/hud/bar_front_energy.webp";
import MoneyIcon from "./assets/ui/hud/icon_money.webp";
import LocationButton from "./assets/ui/hud/btn_map.webp";
import TimeButton from "./assets/ui/hud/btn_time.webp";
import QuestGuideButton from "./assets/ui/hud/btn_quest_guide.webp";
import LabelTitleBg from "./assets/ui/frame_objname_gold.webp";
import LabelBodyBg from "./assets/ui/frame_popup.webp";
import { HudElement } from "../../src/engine/gui";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { Popup } from "../../src/engine/gui";
import { NPC, WorldNPC } from "../../src/gameplay/npc";
import { Dialogue, DialogueSystem, START_DIALOGUE } from "../../src/gameplay/dialogue";
import SayFrameBg from "./assets/ui/dialog/frame_say_bg.webp";
import ChoiceBg from "./assets/ui/dialog/choice.webp";
import { createNamedAnimate } from "../../src/engine/rendereffects";
import TweenShape from "../../src/framework/animations/tween/models";
import { QuestSystem } from "../../src/gameplay/quest";
import { QuestNotifHud } from "./huds/questnotifhud";
import { DevModInterface } from "../../src/modsystem";

Engine.init();
const ebborder = await getEngine().getAssets().loadTexture({source: EnergyBarBorder});
const ebback = await getEngine().getAssets().loadTexture({source: EnergyBarBack});
const ebfront = await getEngine().getAssets().loadTexture({source: EnergyBarFront});

class LocationHudElement extends HudElement {
    icon!: Sprite; 
    text: Text;

    constructor() {
        super();
        getEngine().createSimpleSprite({source: LocationButton})
        .then(sprite => {
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
        getEngine().createSimpleSprite({source: TimeButton})
        .then(sprite => {
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
        getEngine().createSimpleSprite({source: MoneyIcon})
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

        this.border.setTransform(0,0,1,1);
        this.back.setTransform(0,0,1,1);
        this.front.setTransform(0,0,1,1);

        this.barMask = new Graphics();
        
        this.barMask.beginFill(0xffffff);
        this.barMask.drawRect(0, 0, this.back.width, this.back.height);
        this.barMask.endFill();

        this.barMask.setTransform(-150,-50,1,1);

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

        getEngine().createSimpleSprite({source: LabelTitleBg})
        .then(sprite => {
            if (sprite) {
                this.titleBg = sprite;
                this.titleBg.position.set(150, 0);
                this.addChild(this.titleBg, this.titleText);
            }
        });

        getEngine().createSimpleSprite({source: LabelBodyBg})
        .then(sprite => {
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

class TestGame extends BaseGame {

    energy: FiniteResource;
    money: FiniteResource;
    energyHud: EnergyHudElement;
    moneyHud: MoneyHudElement;
    locationHud: LocationHudElement;
    timeHud: TimeHudElement;
    questModalHud: QuestNotifHud;
    dialogueSys: DialogueSystem;
    questSys: QuestSystem;

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
        pos = getEngine().SPR(0.30, 0.05);
        this.energyHud.position.set(pos.x, pos.y);

        this.moneyHud = new MoneyHudElement();
        pos = getEngine().SPR(0.40, 0.025);
        this.moneyHud.position.set(pos.x, pos.y);

        this.questModalHud = new QuestNotifHud();

        getEngine().getHud().addElementToHud("HUD_LOCATION", this.locationHud);
        getEngine().getHud().addElementToHud("HUD_TIME", this.timeHud);
        getEngine().getHud().addElementToHud("HUD_ENERGY", this.energyHud);
        getEngine().getHud().addElementToHud("HUD_MONEY", this.moneyHud);
        getEngine().getHud().addElementToHud("HUD_QUEST_MODAL", this.questModalHud);
        this.dialogueSys = new DialogueSystem();
        this.questSys = new QuestSystem();
        this.registerGameSystem("SYS_DIALOGUE", this.dialogueSys);
        this.registerGameSystem("SYS_QUEST", this.questSys);
        getEngine().createSimpleSprite({source: SayFrameBg})
        .then(sprite => {
            if (sprite) {
                this.dialogueSys.getDialogueHud().setSpeechBackground(sprite);
            }
        });
        getEngine()
			.createSimpleSprite({ source: ChoiceBg })
			.then((sprite) => {
				if (sprite) {
					this.dialogueSys.getDialogueHud().choiceBg = sprite;
				}
			});
        this.questSys.getQuestTrackerHud().setBackground({source: QuestGuideButton});
        pos = getEngine().SPR(0.5, 0.025);
        this.questSys.getQuestTrackerHud().position.set(pos.x, pos.y);

        this.clock.start();
    }

    update(time: number): void {
        super.update(time);
        this.locationHud.setLocation(getEngine().getScene().currentScene?.name??"pending");
        this.timeHud.setTime(`${this.clock.getDayString()} - ${this.clock.getHourString()}:${this.clock.getMinuteString()}`);
        this.energyHud.setEnergy(this.energy.getCurrentValue(), this.energy.getMaxResource());
        this.moneyHud.setMoney(this.money.getCurrentValue());
        if (this.energy.getCurrentValue() === 0) {
            EngineBus.emit(Reload_Scene, createEngineEvent(Reload_Scene, {}));
            this.clock.advanceTime(1);
            this.energy.reset();
        }
        this.dialogueSys.update(time);
        this.questSys.update(time);
    }
}

const testGame = new TestGame(undefined);
createNamedAnimate( 'vpunchpos','position',true,{x:0,y:200,z:0},new TweenShape(0,.7,0,.2,0,.7,0,.1,0,0),true,true)
createNamedAnimate( 'vpunchneg','position',true,{x:0,y:-200,z:0},new TweenShape(0,.7,0,.2,0,.7,0,.1,0,0),true,true)
Engine.setGame(testGame);
const div = document.createElement("div");
const app = document.getElementById("app");
if (app) {
    app.append(div);
}
else {
    document.body.append(div);
}
getEngine().getRender().attachRendererTo(div);
const bathroomScene = new Scene("HomeBathroomScene", {source: BathRoom});
const hallScene = new Scene("HomeHallScene", {source: HomeHall});
const kitchenScene = new Scene("HomeKitchenScene", {source: Kitchen});
const bathroomToHallDoor = await getEngine().createSimpleSceneInteractable("bathroom_door", {action: "interact", handler: () => {
    EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {sceneName: "HomeHallScene", sceneTransition: SceneTransitionFlags.ST_FADE}));
    testGame.energy.decrement(10);
}}, {source: BathRoomDoor}, bathroomScene);
bathroomToHallDoor.anchor.set(0.5);
let pos = getEngine().SPR(0.203, 0.425);
bathroomToHallDoor.setTransform(pos.x, pos.y);
bathroomToHallDoor.setLabel(new InteractableDescription(hallScene.name, "Da Hall"));

const hallToBathroomDoor = await getEngine().createSimpleSceneInteractable("hall_bathroom_door", {action: "interact", handler: () => {
    EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {sceneName: "HomeBathroomScene", sceneTransition: SceneTransitionFlags.ST_FADE}));
    testGame.energy.decrement(10);
}}, {source: HallBathroomDoor}, hallScene);
hallToBathroomDoor.anchor.set(0.5);
pos = getEngine().SPR(0.72, 0.42);
hallToBathroomDoor.setTransform(pos.x, pos.y);
hallToBathroomDoor.setLabel(new InteractableDescription(bathroomScene.name, "Da Bathroom"));

const hallStairs = await getEngine().createSimpleSceneInteractable("hall_stairs", {action: "interact", handler: () => {
    EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {sceneName: "HomeKitchenScene", sceneTransition: SceneTransitionFlags.ST_FADE}));
    testGame.energy.decrement(10);
}}, {source: HallStairs}, hallScene);
hallStairs.anchor.set(0.5);
pos = getEngine().SPR(0.215, 0.815);
hallStairs.setTransform(pos.x, pos.y);
hallStairs.setLabel(new InteractableDescription(kitchenScene.name, "Da Kitchen"));

const kitchenStairs = await getEngine().createSimpleSceneInteractable("kitchen_stairs", {action: "interact", handler: () => {
    EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {sceneName: "HomeHallScene", sceneTransition: SceneTransitionFlags.ST_FADE}));
    testGame.energy.decrement(10);
}}, {source: KitchenStairs}, kitchenScene);
kitchenStairs.anchor.set(0.5);
pos = getEngine().SPR(0.2, 0.5);
kitchenStairs.setTransform(pos.x, pos.y);
kitchenStairs.setLabel(new InteractableDescription(hallScene.name, "Da Hall"));

import MomCoffee from "./assets/locations/home/kitchen/jo_coffee.webp";
const Jo = new NPC("Jo");
const kitchenJo = new WorldNPC("Jo", {source: MomCoffee}, Jo);
kitchenJo.addAction({action: "interact", handler: () => {
    EngineBus.emit(START_DIALOGUE, createEngineEvent(START_DIALOGUE, {dialogueId: "test_dialogue"}));
}});
kitchenJo.anchor.set(0.5);
pos = getEngine().SPR(0.4, 0.3);
kitchenJo.setTransform(pos.x, pos.y);
kitchenJo.setLabel(new InteractableDescription(Jo.name, ""));
kitchenScene.addSceneObject(kitchenJo);

const testDialogue = new Dialogue(Jo, "test_dialogue");
testDialogue.addDialogueLine("Hey hawt stuff.", "Want to come to bed tonight?");
testDialogue.addChoice("Yes");
testDialogue.addChoice("No");
testGame.dialogueSys.addDialogue(testDialogue);

EngineBus.emit(Prep_Scenes, createEngineEvent(Prep_Scenes, {scenes: [bathroomScene, hallScene, kitchenScene]}));

DevModInterface.loadModResource(await import ("./quests/questtemplate"));

EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {sceneName: "HomeBathroomScene", sceneTransition: SceneTransitionFlags.ST_FADE}));

