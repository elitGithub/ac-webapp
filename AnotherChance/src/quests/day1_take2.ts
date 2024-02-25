import { EngineBus, createEngineEvent, getEngine } from "../Engine/engine";
import { Transition_Scene } from "../Engine/engine/scene";
import SceneTransitionFlags from "../Engine/engine/scene/models/scenetransitions";
import {
    Dialogue,
    DialogueChoice,
    DialogueSystem,
    START_DIALOGUE,
} from "../Engine/gameplay/dialogue";
import { ADVANCE_QUEST, QuestStep } from "../Engine/gameplay/quest";
import { DevModInterface } from "../Engine/modsystem";
import { mc } from "../characters";

const day1_take2 = () => {
    const quest = DevModInterface.GAME.QUEST.createQuest(
        "Day_1,_Take_2",
        "The bell rang like five minutes ago, and you're still looking at your phone. Homeroom, now."
    );

    const step1 = new QuestStep("P1", "Phase One");
    const step2 = new QuestStep(
        "entered",
        "The bell rang like five minutes ago, and you're still looking at your phone. Homeroom, now."
    );
    const step3 = new QuestStep(
        "homeroom",
        "we entered homeroom, this hint is never seen."
    );
    const step4 = new QuestStep(
        "isabelle_volunteer",
        "Raised your hand and the stakes. Tour time."
    );
    const step5 = new QuestStep(
        "isabelle_pass",
        "The new girl just got paired with the devil. Should be interesting."
    );
    const step6 = new QuestStep(
        "lindsey_fall",
        "Man, these floors are all sorts of wet today. Hopefully, nothing bad happens..."
    );
    const step7 = new QuestStep(
        "done",
        "A surprising first day to be sure, but a welcome one."
    );

    step1.createOutcome(() => {
        const entranceDoor = DevModInterface.GAME.ENT["entrance_door"];
        if (entranceDoor && entranceDoor["arrived"]) {
            console.log("moving to step 2!");
            return true;
        }
        return false;
    }, "entered");

    step2.createOutcome(() => {
        const loc = DevModInterface.GAME.LOCATION.CURRENT?.name;

        if (loc && loc === "Homeroom") {
            return true;

        }
        // console.log(DevModInterface.GAME.QUEST.FOCUSED?.questSteps);

        return false;
    }, "homeroom");

    step3.createOutcome(() => {
        const isabelle = DevModInterface.GAME.CHARACTER.mc;
        // if (isabelle && isabelle[['isabelle_volunteer']]) {
        //     // When we start the quest here it infinite loops
        //     // DevModInterface.GAME.QUEST.startQuest("Tour de School");
        //     return true;
        // }

        return false;
    }, "isabelle_volunteer");

    step4.createOutcome(() => {
        const isabelle = DevModInterface.GAME.CHARACTER.mc;
        // if (isabelle && isabelle['isabelle_pass']) {
        //     // If the choice should go to isabelle_pass then finish this quest
        //     return true;
        // }
        // const loc = DevModInterface.GAME.LOCATION.CURRENT?.name;
        // if (loc && loc === "Ground_Floor") {
        //     console.log("I'm at ground floor from homeroom!");
        //     return true;
        // }
        return false;
    }, "isabelle_pass");

    step5.createOutcome(() => {

        return false;
    }, "lindsey_fall");

    step6.createOutcome(() => {
        // console.log("at lindsey_fall quest")
        return false;
    }, "done");

    step7.createOutcome(() => {
        return true;
    }, "QUEST_COMPLETE");

    quest.addStep(step1, step2, step3, step4, step5, step6, step7);

    const startDialogue = new Dialogue(mc, "day1take2startdialogue");
    startDialogue.addDialogueEventAction(() => {
        EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {
            sceneName: "Entrance",
            sceneTransition: SceneTransitionFlags.ST_FADE,
        }))
    }, true)
    startDialogue.addDialogueLine(
        "I'm now at Entrance, start the quest day1 take2 now!"
    );
    startDialogue.addDialogueEventAction(() => {
        DevModInterface.GAME.QUEST.startQuest("Day_1,_Take_2")
    }, true)
    startDialogue.addDialogueLine("Now go inside school");

    const goInsideSchool = new Dialogue(mc, "arrived");
    goInsideSchool.addDialogueLine(
        "Through the Gates of Hell... as I make my way to the homeroom... through the normie lines..."
    );
    goInsideSchool.addDialogueEventAction(() => {
        DevModInterface.GAME.ENT['entrance_door']['arrived'] = true;

        EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {
            sceneName: "Ground_Floor",
            sceneTransition: SceneTransitionFlags.ST_FADE,
        }))
    })

    goInsideSchool.addDialogueLine(
        "Some girls lose it harder than others. And those are the milkshakes that bring all the boys to the yard."
    );
    goInsideSchool.addDialogueLine(
        "Or at least a charity show of bouncy delight for the wretched and deprived."
    );
    goInsideSchool.addDialogueLine("...");
    goInsideSchool.addDialogueLine(
        "Better get to the homeroom before they close the door."
    );

    const homeroomDialogue = new Dialogue(mc, "homeroomDialogue");
    homeroomDialogue.addDialogueEventAction(() => {
        EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {
            sceneName: "Homeroom",
            sceneTransition: SceneTransitionFlags.ST_FADE,
        }))
    }, true)
    homeroomDialogue.addDialogueLine(
        "The thick smell of freshly sharpened pencils, cheap perfume, and cigarette smoke always gave the homeroom a shady character."
    );
    homeroomDialogue.addDialogueLine(
        "It's the only room in the school that could, by smell alone, be mistaken for a seedy strip club."
    );
    homeroomDialogue.addDialogueLine(
        "For whatever reason, the janitor never scrubbed this floor with her signature lemon soap, and that still seems to be the case."
    );
    homeroomDialogue.addDialogueLine(
        "And the guys... they're all busy staring at..."
    );
    homeroomDialogue.addDialogueLine("Any questions?");
    // homeroomDialogue.addDialogueEventAction( () => {
    //     EngineBus.emit(START_DIALOGUE, createEngineEvent(START_DIALOGUE, {
    //         dialogueId: "homeroomDialogueContinue"
    //     }))
    // })

    const raiseHand = new DialogueChoice(
        "homeroomDialogue",
        "Raise Hand",
        "raiseHandDialogue",
        () => {
            DevModInterface.GAME.CHARACTER.mc.lust += 1;
        }
    );

    const raiseHandDialogue = new Dialogue(mc, "raiseHandDialogue");
    raiseHandDialogue.addDialogueLine(`Yes? ${mc}`);

    raiseHandDialogue.addChoice(
        "So, we get to sleep in... all year?",
        "wegetsleepdialogue",
        () => {
            console.log(
                "we get sleep choice! add charisma then go to wegetsleepdialogue"
            );
        }
    );

    raiseHandDialogue.addChoice(
        `What classes do you teach this year, mrsl?`,
        "whatclasstoteach"
    );

    const wegetsleep = new Dialogue(mc, "wegetsleepdialogue", "homeroomDialogueContinue");
    wegetsleep.addDialogueLine(
        "Some of you will have to work just as hard as before."
    );
    wegetsleep.addDialogueLine(
        "Others might have more time for... other activities."
    );
    wegetsleep.addDialogueLine("In the end, your grades are all up to you.");
    wegetsleep.addDialogueEventAction(() => {
        EngineBus.emit(START_DIALOGUE, createEngineEvent(START_DIALOGUE, {
            dialogueId: "homeroomDialogueContinue"
        }))
    })

    const whatclasstoteach = new Dialogue(mc, "whatclasstoteach", "homeroomDialogueContinue");
    whatclasstoteach.addDialogueLine(
        "Unfortunately, I won't be teaching any classes this year."
    );
    whatclasstoteach.addDialogueLine(
        "But I will be coaching the Newfall swim team. You're very welcome to try out, [mc]!"
    );
    whatclasstoteach.addDialogueLine(
        "That's... err. Is she being suggestive on purpose?"
    );
    whatclasstoteach.addDialogueLine(
        "She used to look at me with nothing but disgust, and now she's practically hitting on me."
    );
    whatclasstoteach.addDialogueLine("Did she say swimsuit?");

    const staysilentchoice = new DialogueChoice(
        "stay_silent",
        "Stay silent",
        "staysilentdialogue"
    );

    const staysilentdialogue = new Dialogue(mc, "staysilentdialogue", 'homeroomDialogueContinue');
    staysilentdialogue.addDialogueLine(
        "No point risking embarrassment this early in the day."
    );
    staysilentdialogue.addDialogueLine("No? Okay, good.");

    homeroomDialogue.setChoices([raiseHand, staysilentchoice]);

    const homeroomDialogueContinue = new Dialogue(
        mc,
        "homeroomDialogueContinue"
    );
    homeroomDialogueContinue.addDialogueLine(
        "Most of you know each other from last year..."
    );
    homeroomDialogueContinue.addDialogueLine(
        "But we have one new student. She has transferred all the way from Europe."
    );
    homeroomDialogueContinue.addDialogueLine(
        "Everyone, please say hi to [isabelle]!"
    );
    homeroomDialogueContinue.addDialogueLine(
        "Why don't you tell us a bit about yourself?"
    );
    homeroomDialogueContinue.addDialogueLine(
        "I'm sure you'll meet some new friends here!"
    );
    homeroomDialogueContinue.addDialogueLine(
        "Why don't we ask someone to show you around?"
    );
    homeroomDialogueContinue.addDialogueLine("That would be nice.");
    homeroomDialogueContinue.addDialogueLine("Okay! Any volunteers?");

    homeroomDialogueContinue.addChoice("Volunteer", "volunteerdialogue");
    homeroomDialogueContinue.addChoice("Pass", "passdialogue");

    const volunteer = new Dialogue(mc, "volunteerdialogue", "remaininghomedialogue");
    volunteer.addDialogueLine("I could do it.");
    volunteer.addDialogueLine("Suck-up.");
    volunteer.addDialogueLine(
        "Perfect! [mc] will give you a tour of the school."
    );
    volunteer.addDialogueLine(
        "This is your last year of school. So make sure to make the best of it!"
    );
    volunteer.addDialogueEventAction(() => {
        // const isabelle = DevModInterface.GAME.CHARACTER.mc;
        // if (isabelle) {
        //    isabelle['isabelle_volunteer'] = true;
        // }
        // DevModInterface.GAME.QUEST.advanceQuest('Day_1,_Take_2', true, 'isabelle_volunteer');

        DevModInterface.GAME.CHARACTER.mc['isabelle_volunteer'] = true;
        DevModInterface.GAME.QUEST.getQuest("Day_1,_Take_2")?.advanceQuestStep(true, "isabelle_volunteer");
    })
    // Advance quest to isabelle_volunteer

    const pass = new Dialogue(mc, "passdialogue", "remaininghomedialogue");
    pass.addDialogueLine("Come on, now. Don't be shy!");
    pass.addDialogueLine("...");
    pass.addDialogueLine("I'm just going to pick someone, then.");
    pass.addDialogueLine("[kate], you're up!");
    pass.addDialogueLine("How exciting.");
    pass.addDialogueLine(
        "This is your last year of school. So make sure to make the best of it!"
    );
    pass.addDialogueEventAction(() => {
        // const isabelle = DevModInterface.GAME.CHARACTER.mc;
        // if (isabelle) {
        //    isabelle['isabelle_volunteer'] = true;
        //    isabelle['isabelle_pass'] = true;
        // }
        DevModInterface.GAME.CHARACTER.mc['isabelle_pass'] = true;
        DevModInterface.GAME.QUEST.getQuest("Day_1,_Take_2")?.advanceQuestStep(true, "isabelle_pass");
    })
        // Advance quest to isabelle_pass

    // pass.addDialogueEventAction(() => {
    //     DevModInterface.GAME.QUEST.advanceQuest('Day_1,_Take_2', true, 'isabelle_pass')
    // })


    const remaininghomedialogue = new Dialogue(mc, "remaininghomedialogue");
    remaininghomedialogue.addDialogueLine("I think that's all for now. Don't forget to sign up for your focus classes!");
    remaininghomedialogue.addDialogueLine("If you have any questions throughout the year, feel free to stop by here or at the pool.");
    // Act one quest start!
    remaininghomedialogue.addDialogueEventAction( () => {
        DevModInterface.GAME.QUEST.startQuest("Act One")
    })

    // lindsey falling
    const lindseyfallingdialogue = new Dialogue(mc, "lindseyfallingdialogue");

    lindseyfallingdialogue.addDialogueLine("Eeep!");
    lindseyfallingdialogue.addDialogueLine(
        "She tripped over the wet-floor sign. Where's the sign with a warning about hazardous signs?"
    );
    lindseyfallingdialogue.addDialogueLine(
        "For once in my life, I happened to be at the right place at the right time."
    );
    lindseyfallingdialogue.addDialogueLine(
        "It's hard to imagine a top athlete like [lindsey] ever misstepping, but maybe this is that one blue-moon occurrence."
    );
    lindseyfallingdialogue.addDialogueLine(
        "Hmm... this is more of a beige-pink moon, though... a pristine one, without a single blemish or crater..."
    );
    lindseyfallingdialogue.addDialogueLine(
        "One might even call it a full one, if it weren't partially obscured by a sports thong."
    );

    lindseyfallingdialogue.addChoice("Help her up","helpherupdialogue");
    lindseyfallingdialogue.addChoice("Enjoy the view","helpherupdialogue");

    const helpherupdialogue = new Dialogue(mc, "helpherupdialogue");
    helpherupdialogue.addDialogueLine("Are you okay?");
    helpherupdialogue.addDialogueLine(
        "Hmm... no thanks? Well, she did look really embarrassed."
    );
    helpherupdialogue.addDialogueLine(
        "She probably just wanted to get the hell out of here and hide her face. Been there, can relate."
    );
    helpherupdialogue.addDialogueEventAction(() => {
        quest.completeQuest();
        console.log(quest);

        // then go to first hall
        EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {
            sceneName: "First Hall",
            sceneTransition: SceneTransitionFlags.ST_FADE,
        }))
    })
    // this quest should be finished here!




    // lindseyfallingdialogue.addDialogueLine("");
    // lindseyfallingdialogue.addDialogueLine("");
    // lindseyfallingdialogue.addDialogueLine("");
    // lindseyfallingdialogue.addDialogueLine("");
    // lindseyfallingdialogue.addDialogueLine("");
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(homeroomDialogueContinue);
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(remaininghomedialogue);
    getEngine().getGame().dialogueSys.addDialogue(startDialogue);
    getEngine().getGame().dialogueSys.addDialogue(goInsideSchool);
    getEngine().getGame().dialogueSys.addDialogue(homeroomDialogue);
    getEngine().getGame().dialogueSys.addDialogue(wegetsleep);
    getEngine().getGame().dialogueSys.addDialogue(whatclasstoteach);
    getEngine().getGame().dialogueSys.addDialogue(raiseHandDialogue);
    getEngine().getGame().dialogueSys.addDialogue(staysilentdialogue);
    getEngine().getGame().dialogueSys.addDialogue(homeroomDialogueContinue);
    getEngine().getGame().dialogueSys.addDialogue(volunteer);
    getEngine().getGame().dialogueSys.addDialogue(pass);
    getEngine().getGame().dialogueSys.addDialogue(lindseyfallingdialogue);
    getEngine().getGame().dialogueSys.addDialogue(helpherupdialogue);

};

export default day1_take2;
