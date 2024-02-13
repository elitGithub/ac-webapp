import { getEngine } from "../../../src/engine";
import { BaseCharacter } from "../../../src/engine/coreentities/basecharacter";
import { Dialogue, DialogueChoice } from "../../../src/gameplay/dialogue";
import { QuestState, QuestStep } from "../../../src/gameplay/quest";
import { DevModInterface } from "../../../src/modsystem";
import { mc } from "../characters";

const washhands = async () => {
    const quest = DevModInterface.GAME.QUEST.createQuest(
        "Wash Hands",
        "Wash your hands!",
        false
    );

    const step1 = new QuestStep("P1", "Phase One");
    const step2 = new QuestStep("P2_done", "Washing Hands!", false);

    step1.createOutcome(() => {
        const sink = DevModInterface.GAME.ENT.bathroom_sink;
        if (sink && sink.washed_hands) {
            return true;
        }

        return false;
    }, "P2_done");

    step2.createOutcome(() => {
        DevModInterface.GAME.QUEST.startQuest("Dress to the Nine");
        return true;
    }, "QUEST_COMPLETE");

    quest.addStep(step1, step2);

    const WashHandsDialogue = new Dialogue(mc, "WashHandsDialogue");
    WashHandsDialogue.addDialogueLine("Never hurts to flush an extra time!");
    WashHandsDialogue.addDialogueLine("Unless it's clogged...");
    WashHandsDialogue.addDialogueLine("Or you live in Cali...");
    WashHandsDialogue.addDialogueLine(
        "Or you've injured your flushing-hand..."
    );
    WashHandsDialogue.addDialogueLine("Nevermind.");

    const choice = new DialogueChoice(
        "WashHandsDialogue",
        "Wash Hands",
        undefined,
        function () {
            const sink = DevModInterface.GAME.ENT.bathroom_sink;
            if (sink) {
                sink["washed_hands"] = true;
            }
        }
    );

    WashHandsDialogue.setChoices([choice]);

    getEngine().getGame().dialogueSys.addDialogue(WashHandsDialogue);
};

export default washhands;
