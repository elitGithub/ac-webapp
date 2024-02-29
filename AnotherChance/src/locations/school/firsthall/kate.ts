import Asset from "../../../public/assets/images/locations/school/first_hall/kate.webp";

import {
    getEngine,
} from "../../../Engine/engine";
import { DevModInterface } from "../../../Engine/modsystem";
import { Dialogue, DialogueSystem } from "../../../Engine/gameplay/dialogue";
import { mc } from "../../../characters";

const Kate = await getEngine().createSimpleIntractable(
    "firsthall_kate",
    {
        action: "interact",
        handler: () => {
            // EngineBus.emit(
            //     Transition_Scene,
            //     createEngineEvent(Transition_Scene, {
            //         sceneName: "Entrance",
            //         sceneTransition: SceneTransitionFlags.ST_FADE,
            //     })
            // );
            // getEngine().getGame().energy.decrement(10);
            if (DevModInterface.GAME.QUEST.getQuest("Tour de School")?.getCurrentQuestStep()?.questStepId === "confrontation_side_isabelle") {
                DevModInterface.GAME.DIALOGUE.startDialogue("confrontsideisabelle");
            } else {
                DevModInterface.GAME.DIALOGUE.startDialogue("confrontsidekate");
            }
        },
    },
    { source: Asset }
);
Kate.setTransform(700, 550);

const confrontsideisabelle = new Dialogue(mc, "confrontsideisabelle");
confrontsideisabelle.addDialogueLine(
    "Hi, [kate]. Do you have a minute?",
    "For you two? Forget it.",
    "Old me would've jumped ship a long time ago, but this is going to turn into scratching and hair-pulling at any moment."
);

confrontsideisabelle.addChoice("I'm sure this is all a big misunderstanding... let's all just go our separate ways.", "bigmisunderstanding");
confrontsideisabelle.addChoice("So, there's this mud pool next to the football field, if you ladies are interested...");
confrontsideisabelle.addChoice("Teeth can be fixed, but a crooked personality is irredeemable.");
confrontsideisabelle.addChoice("I don't get why you're stirring up shit, [isabelle]. You're new here... apologize to [kate], and let's go.");
confrontsideisabelle.addChoice("If you don't watch your mouth, [kate], I'll gouge your eyes out and fuck your skull.");

const bigmisunderstanding = new Dialogue(mc, "bigmisunderstanding");
bigmisunderstanding.addDialogueLine(
    "I'm sure this is all a big misunderstanding... let's all just go our separate ways.",
    "What do you mean? She's way out of line!",
    "Years and years of high social status, good looks, and terrible parenting is my guess...",
    "You know what? I'm over it... come on, [mc], let's go."
);

bigmisunderstanding.addChoice("Stay with [kate]", "staywithkate");
bigmisunderstanding.addChoice("Leave with [isabelle]");

const staywithkate = new Dialogue(mc, "staywithkate");
staywithkate.addDialogueLine(
    "Start the tour without me... the English classroom is right around the corner.",
    "See? Even this loser thinks you're too lame to hang out with.",
    "Plus, her smell is simply divine... apricots and cherries, with just a hint of Hell.",
);
staywithkate.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "english_class");
    DevModInterface.GAME.QUEST.startQuest("Kate Over Isabelle");
    DevModInterface.GAME.QUEST.getQuest("Kate Over Isabelle")?.advanceQuestStep(true, "winning_team");
});

const leavewithisabelle = new Dialogue(mc, "leavewithisabelle");
leavewithisabelle.addDialogueLine(
    "Never thought you'd say those words!",
    "The drama queen and her spineless puppy, slinking off into the sunset...",
    "Keep dreaming, sweetheart."
);
leavewithisabelle.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "english_class");
    DevModInterface.GAME.QUEST.startQuest("Isabelle Over Kate");
})



const confrontsidekate = new Dialogue(mc, "confrontsidekate");
confrontsidekate.addDialogueLine(
    "What's your deal, [kate]? Are you always this much of a wanker?",
    "Listen, bitch. I don't know who you think you are, but I couldn't care less.",
    "Why don't you  tuck those crooked English teeth back under that thick lip of yours and scuttle along, hm?",
    "Seems like the confrontation didn't go as planned. [kate]'s definitely winning, but no real surprise there.",
    "Good, because I'm leaving. See you in the English classroom, [mc].",
    "Off you go! Was that so hard?",
    "Why are you still here?"
);
confrontsidekate.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "english_class");
})

// cibst


getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(confrontsidekate);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(confrontsideisabelle);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(bigmisunderstanding);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(staywithkate);




export default Kate;
