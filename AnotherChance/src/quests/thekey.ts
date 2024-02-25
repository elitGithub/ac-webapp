import { QuestStep } from "../Engine/gameplay/quest";
import {DevModInterface} from "../Engine/modsystem";

export default function Quest() {
    const quest = DevModInterface.GAME.QUEST.createQuest("The Key", "On the surface, it's a simple task. Actually getting it might be harder.");

    const step1 = new QuestStep("start", "The place that smells of doughnuts, coffee, and sloth.");
    const step2 = new QuestStep("done", "Help! I can't get the key from the [guard]! Oh, wait. It's right here. How silly of me.");

    step2.createOutcome(() => {
        return true;
    }, "QUEST_COMPLETE")

    quest.addStep(step1, step2);
}
