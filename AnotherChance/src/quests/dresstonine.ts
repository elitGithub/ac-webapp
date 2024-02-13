import { getEngine } from "../../../src/engine";
import { Dialogue, DialogueChoice } from "../../../src/gameplay/dialogue";
import { QuestState, QuestStep } from "../../../src/gameplay/quest";
import { DevModInterface } from "../../../src/modsystem";
import { mc } from "../characters";

const dresstonine = async () => {
    const quest = DevModInterface.GAME.QUEST.createQuest(
        "Dress to the Nine",
        "Or, like... to the four, maybe. Nothing fancy in that wardrobe."
    );

    const step1 = new QuestStep("P1", "Phase One");
    const step2 = new QuestStep(
        "P2_done",
        "At least you're not naked. You've spared many from years of therapy."
    );

    step1.createOutcome(
        () => {
            const closet = DevModInterface.GAME.ENT.bedroom_closet;
            if (closet && closet.shirt === "striped vest") {
                return true;
            }
            return false;
        },
        "P2_done",
        "Hardest part of the day completed. It's smooth sailing from here."
    );

    step2.createOutcome(() => {
        return true;
    }, "QUEST_COMPLETE");

    quest.addStep(step1, step2);

    const DresstoNine = new Dialogue(mc, "DresstoNine");
    DresstoNine.addDialogueLine("I see it now.");
    DresstoNine.addDialogueLine("The bedroom looks different.");
    DresstoNine.addDialogueLine(
        "Fully processing this fuckery would require more lifeforce than I currently have."
    );
    DresstoNine.addDialogueLine("Might as well get dressed.");

    const closetDialogue = new Dialogue(mc, "ClosetDialogue");
    closetDialogue.addDialogueLine(
        "Last time, my shirt was on backward and had a mustard stain."
    );
    closetDialogue.addDialogueLine(
        "Wouldn't hurt to put some more thought into it this time."
    );

    const choice1 = new DialogueChoice(
        "striped vest",
        "Wear the striped vest to display my fashion sense",
        "stripedVestDialogue",
        () => {
            // choice striped vest!
            console.log("choose striped vest!");

            // DevModInterface.GAME.QUEST.FOCUSED?.completeQuest();

            const closet = DevModInterface.GAME.ENT.bedroom_closet;
            if (closet) {
                closet["shirt"] = "striped vest";
            }
        }
    );

    const stripedVest = new Dialogue(mc, "stripedVestDialogue");
    stripedVest.addDialogueLine(
        "Putting it on and pulling it off are two completely different skills when it comes to clothes."
    );
    stripedVest.addDialogueLine(
        "The risk of getting laughed at always stopped me before, but it's not like playing it safe ever did me any favors."
    );

    closetDialogue.setChoices([choice1]);

    getEngine().getGame().dialogueSys.addDialogue(DresstoNine);
    getEngine().getGame().dialogueSys.addDialogue(closetDialogue);
    getEngine().getGame().dialogueSys.addDialogue(stripedVest);
};

export default dresstonine;
