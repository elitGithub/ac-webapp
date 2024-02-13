import { QuestStep } from "../../../src/gameplay/quest";
import {DevModInterface} from "../../../src/modsystem";

export default function Quest() {
    const quest = DevModInterface.GAME.QUEST.createQuest("Act One", "Act one START!");
    const step1 = new QuestStep("start", "Phase One");
    const step2 = new QuestStep("done", "I've done it.");
    const step3 = new QuestStep("failed", "I'm done for.");

    step1.createOutcome(() => {
        if (DevModInterface.GAME.LOCATION.CURRENT?.name === "TestScene3") {
            return true;
        }
        return false;
    }, "QuestStep2", "Phase Two");
    step2.createOutcome(() => {
        if (DevModInterface.GAME.RESOURCE["ENERGY"].getCurrentValue() < 20) {
            return true;
        }
        return false;
    }, "QUEST_COMPLETE", "Energy Depleted");
    quest.addStep(step1, step2);

    // Make sure this is only set after steps have been added.
    // quest.enableImmediately = true;

}