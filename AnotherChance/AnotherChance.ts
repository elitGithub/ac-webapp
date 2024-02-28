import { BaseGame } from "./src/Engine/gameplay/game";
import { FiniteResource } from "./src/Engine/gameplay/finiteresource";
import { EnergyHudElement } from "./src/huds/energyhud";
import { MoneyHudElement } from "./src/huds/moneyhud";
import { LocationHudElement } from "./src/huds/locationhud";
import { TimeHudElement } from "./src/huds/timehud";
import { QuestNotifHud } from "./src/huds/questnotifhud";
import { DialogueSystem } from "./src/Engine/gameplay/dialogue";
import { QuestSystem } from "./src/Engine/gameplay/quest";
import { createEngineEvent, EngineBus, getEngine } from "./src/Engine/engine";
import { Reload_Scene } from "./src/Engine/engine/scene";
import QuestGuideButton from "./public/assets/images/ui/hud/btn_quest_guide.webp";
import ChoiceBg from "./public/assets/images/ui/dialog/choice.webp";
import SayFrameBg from "./public/assets/images/ui/dialog/frame_say_bg.webp";
import { SceneFactory } from "./src/Factory/SceneFactory.ts";
import { Hoverable } from "./src/Engine/engine/gui";

export class AnotherChance extends BaseGame {
    energy: FiniteResource;
    money: FiniteResource;
    energyHud: EnergyHudElement;
    moneyHud: MoneyHudElement;
    locationHud: LocationHudElement;
    timeHud: TimeHudElement;
    questModalHud: QuestNotifHud;
    dialogueSys: DialogueSystem;
    questSys: QuestSystem;
    loader!: SceneFactory;

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
        pos = getEngine().SPR(0.213, 0.025);
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
            .createHoverAbleSprite({ source: ChoiceBg })
            .then((sprite) => {
                if (sprite) {
                    this.dialogueSys.getDialogueHud().choiceBg = sprite as unknown as Hoverable;
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
