import { getEngine } from "../../../src/engine";
import { Dialogue, DialogueSystem } from "../../../src/gameplay/dialogue";
import { QuestState, QuestStep } from "../../../src/gameplay/quest";
import {DevModInterface} from "../../../src/modsystem";
import { mc } from "../characters";

export default function Quest() {
    const quest = DevModInterface.GAME.QUEST.createQuest("Tour de School", "She wants it. The big tour. Show her {i}everything{/}.");
    const step1 = new QuestStep("beginning", "Stop thinking about sex. It's a school tour, not a tinder date.");
    const step2 = new QuestStep("upstairs", "An adventure awaits behind every corner... and maybe up every staircase? We'll see.");
    const step3 = new QuestStep("first_hall_meetup", "A fleeting moment on a set of stairs. Enemies at first glance.");
    const step4 = new QuestStep("confrontation_side_isabelle", "Confronting the dark queen? Don your shining armor and ride forth, oh whitest of knights.");
    const step5 = new QuestStep("confrontation_side_kate", "The new girl versus the dark queen. Can I have an extra large bag of popcorn, please.");
    const step6 = new QuestStep("english_class", "The English girl in the English classroom. Write me a posh romantic cliché.");
    const step7 = new QuestStep("art_class", "As if English wasn't bad enough. Now she wants to be an artist! Why can't she just be uncultured?");
    const step8 = new QuestStep("gym", "Gym class? Seriously? Why can't she be more cultured?");
    const step9 = new QuestStep("crash", "Looks like I'm playing Mercy again.");
    const step10 = new QuestStep("cafeteria", "The end of one journey is the beginning of another. And this one ends in the cafeteria.");
    const step11 = new QuestStep("done", "Completed the tour almost scot-free. That's worth a trophy of some sort.");


    step1.createOutcome(() => {
        if (DevModInterface.GAME.LOCATION.CURRENT?.name === "Ground_Floor") {
            const isabelle = DevModInterface.GAME.ENT["school_isabelle"];
            // console.log(isabelle)
            if (isabelle) {
                isabelle.visible = true
            }
            return true;
        }
        return false;
    }, "upstairs");
    step2.createOutcome(() => {
        if (DevModInterface.GAME.LOCATION.CURRENT?.name === "First Hall" && DevModInterface.GAME.QUEST.getQuest("Day_1,_Take_2")?.state === QuestState.COMPLETED) {
            DevModInterface.GAME.DIALOGUE.startDialogue("goupstairs");
            return true;
        }

        return false;
    }, "first_hall_meetup");

    step3.createOutcome(() => {

        return false;
    }, "confrontation_side_isabelle");

    step4.createOutcome(() => {

        return false;
    }, "confrontation_side_kate");

    
    step5.createOutcome(() => {
        return false;
    }, "english_class");

    step6.createOutcome(() => {
      
        // const mc = DevModInterface.GAME.CHARACTER.mc;
        // if (mc && mc['english_class_intro']) {
        //     DevModInterface.GAME.DIALOGUE.startDialogue("english_arrive");
        // }

        if (DevModInterface.GAME.LOCATION.CURRENT?.name === "English Class") {
            DevModInterface.GAME.DIALOGUE.startDialogue("english_arrive");
        }
        return false;
    }, "art_class");

    step7.createOutcome(() => {
        if (DevModInterface.GAME.LOCATION.CURRENT?.name === "Art Class") {
            DevModInterface.GAME.DIALOGUE.startDialogue("art_arrive");
        }
        return false;
    }, "gym");

    step8.createOutcome(() => {

        return false;
    }, "crash");

    
    step9.createOutcome(() => {

        return false;
    }, "cafeteria");

    step10.createOutcome(() => {

        return false;
    }, "done");
    step11.createOutcome(() => true, "QUEST_COMPLETE");

    quest.addStep(step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11);


    const tourdialogue = new Dialogue(mc, "tourdialogue");
    tourdialogue.addDialogueLine(
        "I just wanted to say that I appreciate you showing me around.",
        "It's fine! This school is confusing sometimes, even for me.",
        "It's been years since graduation... my memory is a bit fuzzy on the layout.",
        "So, I guess we should start by signing up for our focus classes. That's what [mrsl] said, right?",
        "I think so!",
        "What classes are you interested in?",
        "Hmm... I haven't really had the time to think about it yet, but English is a given for me... we could start there."
    );

    tourdialogue.addDialogueEventAction(() => {
        if (DevModInterface.GAME.QUEST.getQuest("The Key")?.state !== QuestState.COMPLETED) {
            tourdialogue.defaultNextDialogueId = "pickupkey";
        } else {
            tourdialogue.defaultNextDialogueId = "headupstairs";
        }

        DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "upstairs");
    });

    const pickupkey = new Dialogue(mc, "pickupkey");
    pickupkey.addDialogueLine(
        "Sure, just got to pick up my locker key. Meet you upstairs, okay?",
        "All right! See you there."
    );
    
    const headupstairs = new Dialogue(mc, "headupstairs");
    headupstairs.addDialogueLine(
        "Sure, let's head upstairs, then.",
        "Great!"
    );

    const goupstairs = new Dialogue(mc, "goupstairs");
    goupstairs.addDialogueEventAction(() => {

    }, true)
    goupstairs.addDialogueLine(
        "The 1st Floor — what a sight!",
        "Long have I waited to tread these halls, feel the wind in my hair, and behold the fair maidens of this elevated height!",
        "Or, you know... panic starts to set in, the AC is still broken, and the girls run at the mere sight of me...",
        "Not much has changed here."
    );

    const english_arrive = new Dialogue(mc, "english_arrive");
    english_arrive.addDialogueLine(
        "English was never one of my good subjects.",
        "Studying mossy poets and authors from a distant past always seemed like a waste of time.",
        "This classroom is waking a lot of memories from hibernation...",
        "The only good one is getting third place at a mock spelling bee. How sad is that?"
    )

    const art_arrive = new Dialogue(mc, "art_arrive");
    art_arrive.addDialogueLine(
        "Hi and welcome! My name is [jacklyn] Hyde.",
        "I'm still a teacher's assistant, but due to Mrs. Bloomer's poor health, I've been asked to step in until she gets back.",
        "That lady was closing in on sixty, with cigarette-yellowed teeth and enough wrinkles to compete with a bowl of raisins...",
        "Wicked! What's your name?",
        "Oh, great. I'm [isabelle].",
        "Badass. Okay, you're on the shortlist, babylegs!"
    )


    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(tourdialogue);
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(pickupkey);
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(headupstairs);
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(goupstairs);
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(english_arrive);
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(art_arrive);









}