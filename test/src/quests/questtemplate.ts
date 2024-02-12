import { QuestStep } from "../../../src/gameplay/quest";
import {DevModInterface} from "../../../src/modsystem";

export default function Quest() {
    const quest = DevModInterface.GAME.QUEST.createQuest("TestQuest", "A demonstration of the quest system.");
    const step1 = new QuestStep("QuestStep1", "Phase One");
    step1.createOutcome(() => {
        if (DevModInterface.GAME.LOCATION.CURRENT?.name === "TestScene3") {
            return true;
        }
        return false;
    }, "QuestStep2", "Phase Two");
    const step2 = new QuestStep("QuestStep2", "Phase Two");
    step2.createOutcome(() => {
        if (DevModInterface.GAME.RESOURCE["ENERGY"].getCurrentValue() < 20) {
            return true;
        }
        return false;
    }, "QUEST_COMPLETE", "Energy Depleted");
    quest.addStep(step1, step2);

    // Make sure this is only set after steps have been added.
    quest.enableImmediately = true;

    console.log("hattusa");
}