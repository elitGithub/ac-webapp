import { QuestStep } from "../Engine/gameplay/quest";
import {DevModInterface} from "../Engine/modsystem";

export default function Quest() {
    const quest = DevModInterface.GAME.QUEST.createQuest("Isabelle Over Kate", "[kate]'s reign of terror must be stopped. The new girl said so. I don't even work here.");

    const step1 = new QuestStep("choosing_isabelle", "[kate]'s reign of terror must be stopped. The new girl said so. I don't even work here.", true);
    const step2 = new QuestStep("meeting", "", true);
    const step3 = new QuestStep("search_and_schedule","A spy. A covert operative. An undercover agent. Someone who sort of... learns [isabelle]'s schedule. Yeah, very badass.", true);
    const step4 = new QuestStep("done", "At this point, saving your own skin is what matters. Consequences be damned.");
    const step5 = new QuestStep("failed", "At this point, saving your own skin is what matters. Consequences be damned.");


    step4.createOutcome(() => true, "QUEST_COMPLETE");

    step5.createOutcome(() => true, "QUEST_FAILED");

    quest.addStep(step1, step2, step3, step4, step5);
}
