import { getEngine, EngineBus, createEngineEvent } from "../../src/engine";
import { Hoverable } from "../../src/engine/gui";
import { Reload_Scene } from "../../src/engine/scene";
import { DialogueSystem } from "../../src/gameplay/dialogue";
import { FiniteResource } from "../../src/gameplay/finiteresource";
import { BaseGame } from "../../src/gameplay/game";
import { QuestSystem } from "../../src/gameplay/quest";
import { EnergyHudElement } from "./huds/energyhud";
import { LoadButton } from "./huds/loadbutton";
import { LocationHudElement } from "./huds/locationhud";
import { MoneyHudElement } from "./huds/moneyhud";
import { QuestNotifHud } from "./huds/questnotifhud";
import { SaveButton } from "./huds/savebutton";
import { TimeHudElement } from "./huds/timehud";

import SayFrameBg from "./assets/ui/dialog/frame_say_bg.webp";
import ChoiceBg from "./assets/ui/dialog/choice.webp";
import ChoiceHoverBg from "./assets/ui/dialog/choice_hover.webp";
import QuestGuideButton from "./assets/ui/hud/btn_quest_guide.webp";

export class TestGame extends BaseGame {

    energy: FiniteResource;
    money: FiniteResource;
    energyHud: EnergyHudElement;
    moneyHud: MoneyHudElement;
    locationHud: LocationHudElement;
    saveBtnHud: SaveButton;
    loadBtnHud: LoadButton;
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
        pos = getEngine().SPR(0.22, 0.025);
        this.energyHud.position.set(pos.x, pos.y);

        this.moneyHud = new MoneyHudElement();
        pos = getEngine().SPR(0.40, 0.025);
        this.moneyHud.position.set(pos.x, pos.y);

        this.questModalHud = new QuestNotifHud("HUD_QUEST_MODAL");

        this.saveBtnHud = new SaveButton();
        pos = getEngine().SPR(0.9, 0.025);
        this.saveBtnHud.position.set(pos.x, pos.y);

        this.loadBtnHud = new LoadButton();
        pos = getEngine().SPR(0.9, 0.055);
        this.loadBtnHud.position.set(pos.x, pos.y);

        getEngine().getHud().addElementToHud("HUD_LOCATION", this.locationHud);
        getEngine().getHud().addElementToHud("HUD_TIME", this.timeHud);
        getEngine().getHud().addElementToHud("HUD_ENERGY", this.energyHud);
        getEngine().getHud().addElementToHud("HUD_MONEY", this.moneyHud);
        getEngine().getHud().addElementToHud("HUD_QUEST_MODAL", this.questModalHud);
        getEngine().getHud().addElementToHud("HUD_SAVEBUTTON", this.saveBtnHud);
        getEngine().getHud().addElementToHud("HUD_LOADBUTTON", this.loadBtnHud);
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
        this.dialogueSys.getDialogueHud().setChoiceBg(new Hoverable({ source: ChoiceBg }, { source: ChoiceHoverBg}))
        this.questSys.getQuestTrackerHud().setBackground({source: QuestGuideButton});
        pos = getEngine().SPR(0.5, 0.025);
        this.questSys.getQuestTrackerHud().position.set(pos.x, pos.y);

        this.clock.start();
    }

    update(time: number): void {
        super.update(time);
        this.locationHud.setLocation(getEngine().getScene().getCurrentScene()?.name??"pending");
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