import { QuestStep } from "../Engine/gameplay/quest";
import {DevModInterface} from "../Engine/modsystem";

export default function Quest() {
    const quest = DevModInterface.GAME.QUEST.createQuest("Kate Over Isabelle", "It's always about playing it smart. Picking the winning team. Kissing up to [kate].");

    const step1 = new QuestStep("winning_team", "It's always about playing it smart. Picking the winning team. Kissing up to [kate].", true);
    const step2 = new QuestStep("talking_to_kate", "", true);
    const step3 = new QuestStep("spy_focus","A spy. A covert operative. An undercover agent. Someone who sort of... learns [isabelle]'s schedule. Yeah, very badass.", true);
    const step4 = new QuestStep("spy_drink", "A beverage informant about to unveil the greatest mystery of our time — [isabelle]'s favorite drink.", true);
    const step5 = new QuestStep("report", "For services rendered, a reward awaits. The queen will be most gracious.");
    const step6 = new QuestStep("search_and_schedule", "", true);
    const step7 = new QuestStep("done", "There's only picking one side in this war. Will you survive? Probably not.");
    const step8 = new QuestStep("failed", "There's only picking one side in this war. Will you survive? Probably not.");

    step7.createOutcome(() => true, "QUEST_COMPLETE");

    step8.createOutcome(() => true, "QUEST_FAILED");

    quest.addStep(step1, step2, step3, step4, step5, step6, step7, step8);
}
