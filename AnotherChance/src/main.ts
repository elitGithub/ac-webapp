//getEngine().getScene().currentScene

import {
    Engine,
    getEngine,
    EngineBus,
    createEngineEvent,
} from "../../src/engine";
import {
    Reload_Scene,
} from "../../src/engine/scene";
import { QuestSystem } from "../../src/gameplay/quest";
import { HudElement, Popup } from "../../src/engine/gui";
import { BaseGame } from "../../src/gameplay/game";
import { DialogueSystem } from "../../src/gameplay/dialogue";
import { FiniteResource } from "../../src/gameplay/finiteresource";
import { Container, Graphics, Sprite, Text } from "pixi.js";

import EnergyBarBorder from "./assets/ui/hud/bar_border_energy.webp";
import EnergyBarBack from "./assets/ui/hud/bar_back_energy.webp";
import EnergyBarFront from "./assets/ui/hud/bar_front_energy.webp";
import MoneyIcon from "./assets/ui/hud/icon_money.webp";
import LocationButton from "./assets/ui/hud/btn_map.webp";
import TimeButton from "./assets/ui/hud/btn_time.webp";
import LabelTitleBg from "./assets/ui/frame_objname_gold.webp";
import LabelBodyBg from "./assets/ui/frame_popup.webp";
import SayFrameBg from "./assets/ui/dialog/frame_say_bg.webp";

import QuestGuideButton from "./assets/ui/hud/btn_quest_guide.webp";
import ChoiceBg from "./assets/ui/dialog/choice.webp";

import { START_DIALOGUE } from "../../src/gameplay/dialogue";

Engine.init();

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
        pos = getEngine().SPR(0.3, 0.05);
        this.energyHud.position.set(pos.x, pos.y);

        this.moneyHud = new MoneyHudElement();
        pos = getEngine().SPR(0.4, 0.025);
        this.moneyHud.position.set(pos.x, pos.y);

        this.questModalHud = new QuestNotifHud();

        getEngine().getHud().addElementToHud("HUD_LOCATION", this.locationHud);
        getEngine().getHud().addElementToHud("HUD_TIME", this.timeHud);
        getEngine().getHud().addElementToHud("HUD_ENERGY", this.energyHud);
        getEngine().getHud().addElementToHud("HUD_MONEY", this.moneyHud);
        getEngine()
            .getHud()
            .addElementToHud("HUD_QUEST_MODAL", this.questModalHud);
        this.dialogueSys = new DialogueSystem();
        this.questSys = new QuestSystem();
        this.registerGameSystem("SYS_DIALOGUE", this.dialogueSys);
        this.registerGameSystem("SYS_QUEST", this.questSys);
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
        this.questSys
            .getQuestTrackerHud()
            .setBackground({ source: QuestGuideButton });
        pos = getEngine().SPR(0.5, 0.025);
        this.questSys.getQuestTrackerHud().position.set(pos.x, pos.y);

        this.clock.start();
    }

    update(time: number): void {
        super.update(time);
        this.locationHud.setLocation(
            getEngine().getScene().currentScene?.name ?? "pending"
        );
        this.timeHud.setTime(
            `${this.clock.getDayString()} - ${this.clock.getHourString()}:${this.clock.getMinuteString()}`
        );
        this.energyHud.setEnergy(
            this.energy.getCurrentValue(),
            this.energy.getMaxResource()
        );
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

const testGame = new TestGame(undefined);
Engine.setGame(testGame);

createNamedAnimate(
    "vpunchpos",
    "position",
    true,
    { x: 0, y: 200, z: 0 },
    new TweenShape(0, 0.7, 0, 0.2, 0, 0.7, 0, 0.1, 0, 0),
    true,
    true
);
createNamedAnimate(
    "vpunchneg",
    "position",
    true,
    { x: 0, y: -200, z: 0 },
    new TweenShape(0, 0.7, 0, 0.2, 0, 0.7, 0, 0.1, 0, 0),
    true,
    true
);
createNamedAnimate(
    "slide_250",
    "position",
    false,
    { x: 250, y: 0, z: 0 },
    new TweenShape(0, 0.1, 0.3, 0.5, 0.7, 0.9, 1),
    true,
    true
);
createNamedAnimate(
    "slide_1250",
    "position",
    false,
    { x: 1250, y: 0, z: 0 },
    new TweenShape(0, 0.1, 0.3, 0.5, 0.7, 0.9, 1),
    true,
    true
);

const div = document.createElement("div");
const app = document.getElementById("app");
if (app) {
    app.append(div);
} else {
    document.body.append(div);
}
getEngine().getRender().attachRendererTo(div);

import { createNamedAnimate } from "../../src/engine/rendereffects";
import TweenShape from "../../src/framework/animations/tween/models/tweenshape";
import { DevModInterface } from "../../src/modsystem";
import { QuestNotifHud } from "./huds/questnotifhud";
import { DynamicSceneLoader } from "./Factory/SceneFactory.ts";

DevModInterface.loadModResource(await import("./characters/index"));
DevModInterface.loadModResource(await import("./quests/SmashOrPass"));
DevModInterface.loadModResource(await import("./quests/Bed"));
DevModInterface.loadModResource(await import("./Isabelle"));
DevModInterface.loadModResource(await import("./quests/naturescall"));
DevModInterface.loadModResource(await import("./quests/washhands"));
DevModInterface.loadModResource(await import("./quests/dresstonine"));
DevModInterface.loadModResource(await import("./characters/jo"));
DevModInterface.loadModResource(await import("./quests/backtoschoolspecial"));
DevModInterface.loadModResource(await import("./quests/day1_take2"));
DevModInterface.loadModResource(await import("./characters/index"));
DevModInterface.loadModResource(await import("./quests/isabelle_tour"));
DevModInterface.loadModResource(await import("./quests/thekey"));
DevModInterface.loadModResource(await import("./quests/kateoverisabelle"));
DevModInterface.loadModResource(await import("./quests/isabelleoverkate"));

const loader = new DynamicSceneLoader();
loader.loadScenes(['Bedroom']);
// Home
// await import("./locations/home/bedroom/bedroom");
await import("./locations/home/bathroom/bathroom");
await import("./locations/home/hall/hall");
await import("./locations/home/kitchen/kitchen");

// School
await import("./locations/school/entrance/entrance");
await import("./locations/school/groundfloor/grounfloor");
await import("./locations/school/homeroom/homeroom");
await import("./locations/school/firsthall/firsthall");
await import("./locations/school/firsthallwest/firsthallwest");
await import("./locations/school/artclass/artclass");
await import("./locations/school/englishclass/englishclass");
await import("./locations/school/firsthalleast/firsthalleast");
await import("./locations/school/gym/gym");

await import("./transition");
