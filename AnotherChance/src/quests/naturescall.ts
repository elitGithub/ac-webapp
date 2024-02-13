import { getEngine } from "../../../src/engine";
import { BaseCharacter } from "../../../src/engine/coreentities/basecharacter";
import { Dialogue, DialogueChoice } from "../../../src/gameplay/dialogue";
import { QuestState, QuestStep } from "../../../src/gameplay/quest";
import { DevModInterface } from "../../../src/modsystem";
import { mc } from "../characters";

const naturescall = async () => {
    const quest = DevModInterface.GAME.QUEST.createQuest(
        "Nature's Call",
        "Standing up or sitting down? Either way, it's time for a leak."
    );

    const step1 = new QuestStep("P1", "Phase One");
    const step2 = new QuestStep(
        "P2_done",
        "Hardest part of the day completed. It's smooth sailing from here.",
        false
    );

    step1.createOutcome(() => {
        const toilet = DevModInterface.GAME.ENT.bathroom_toilet;
        if (toilet && toilet.natures_call) {
            return true;
        }

        return false;
    }, "P2_done");

    step2.createOutcome(() => {
        // Start wash hands quest
        DevModInterface.GAME.QUEST.startQuest("Wash Hands");
        return true;
    }, "QUEST_COMPLETE");

    // quest.enableImmediately = true;

    quest.addStep(step1, step2);

    const ToiletDialogue = new Dialogue(mc, "ToiletDialogue");
    ToiletDialogue.addDialogueLine("...");
    ToiletDialogue.addDialogueLine(
        "Is there anything better than emptying a full bladder?"
    );
    ToiletDialogue.addDialogueLine(
        "Maybe sex, love, or joy. But those things don't come easily... or ever, really."
    );
    ToiletDialogue.addDialogueLine("...");
    ToiletDialogue.addDialogueLine("Ahh, just like that.");

    const choice = new DialogueChoice(
        "ToiletDialogue",
        "Turn It Off",
        undefined,
        function () {
            const toilet = DevModInterface.GAME.ENT.bathroom_toilet;
            if (toilet) {
                toilet["natures_call"] = true;
            }
        }
    );

    ToiletDialogue.setChoices([choice]);

    if (DevModInterface.GAME.LOCATION.CURRENT?.name === "Bathroom") {
        console.log("Quest start in bathroom");
    }

    getEngine().getGame().dialogueSys.addDialogue(ToiletDialogue);
};

export default naturescall;
