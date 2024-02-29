import Door from "../../../../public/assets/images/locations/school/homeroom/door.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";
import { Dialogue, DialogueSystem } from "../../../Engine/gameplay/dialogue";
import { mc } from "../../../characters";
import { DevModInterface } from "../../../Engine/modsystem";

const HomeroomDoor = await getEngine().createSimpleIntractable(
    "homeroom_exit",
    {
        action: "interact",
        handler: () => {
            console.log(DevModInterface.GAME.QUEST.FOCUSED?.getCurrentQuestStep())
            if (DevModInterface.GAME.QUEST.getQuest("Day_1,_Take_2")?.getCurrentQuestStep()?.questStepId === "isabelle_volunteer") {
                DevModInterface.GAME.DIALOGUE.startDialogue("volunteer");
                return;
            }
            if (DevModInterface.GAME.QUEST.getQuest("Day_1,_Take_2")?.getCurrentQuestStep()?.questStepId === "isabelle_pass") {
                DevModInterface.GAME.DIALOGUE.startDialogue("isabellepassdialogue");
                return;
            } else {
                EngineBus.emit(
                    Transition_Scene,
                    createEngineEvent(Transition_Scene, {
                        sceneName: "Ground_Floor",
                        sceneTransition: SceneTransitionFlags.ST_FADE,
                    })
                );
            }

            // if (DevModInterface.GAME.QUEST.getQuest("Tour de School")?.state === QuestState.IN_PROGRESS) {
            // EngineBus.emit(
            //     Transition_Scene,
            //     createEngineEvent(Transition_Scene, {
            //         sceneName: "Ground_Floor",
            //         sceneTransition: SceneTransitionFlags.ST_FADE,
            //     })
            // );
            // }

            // getEngine().getGame().energy.decrement(10);
        },
    },
    { source: Door }
);
HomeroomDoor.setTransform(1400, 300);

// isabelle_pass quest
const pass = new Dialogue(mc, "isabellepassdialogue");
pass.addDialogueLine("Hi! Sorry to bother you.");
pass.addDialogueLine("It's... fine. No need to be. Sorry, I mean. No need to be sorry!");
pass.addDialogueLine("Crap. Speaking to women was never my strong suit.");
pass.addDialogueLine("I think my guide ditched me.");
pass.addDialogueLine("Typical [kate]. She always was the biggest bitch in the school. Not just to me.");
pass.addDialogueLine("Everyone else left. Would you mind showing me around?");

pass.addChoice("Sure thing! Follow me.", "surething");

const surething = new Dialogue(mc, "surething", "lastDialogue");
surething.addDialogueLine("Sure thing! Follow me.");
surething.addDialogueLine("Thanks, this school is pretty big.");
// surething.addDialogueEventAction(() => {
//     DevModInterface.GAME.QUEST.startQuest("Tour de School");
// })


pass.addChoice("I could show you more than just the school...", "showmorethanschool");

const showmorethanschool = new Dialogue(mc, "showmorethanschool");
showmorethanschool.addDialogueLine("I could show you more than just the school...");
showmorethanschool.addDialogueLine("And what would that be?");

showmorethanschool.addChoice("My dic...tionary. I heard English girls like big words.", "dictionary");
showmorethanschool.addChoice("Err, I just know the grounds really well. Follow me!", "knowthegrounds");
showmorethanschool.addChoice("The gym, of course. Nothing like starting the day off with a full-body workout!");

const dictionary = new Dialogue(mc, "dictionary", "lastDialogue");
dictionary.addDialogueLine("My dic...tionary. I heard English girls like big words.");
dictionary.addDialogueLine("I suppose you're right!");
dictionary.addDialogueLine("Luckily for you, we also like cheese.");
dictionary.addDialogueLine("Fine. Lead the way, then.");
dictionary.addDialogueLine("She did seem to like that, but maybe she's just polite.");
dictionary.addDialogueLine("Damn it! Girls are so hard to read.");
dictionary.addDialogueLine("Okay, just got to keep my head cool and the spaghetti in my pockets now.");

const knowthegrounds = new Dialogue(mc, "knowthegrounds", "lastDialogue");
knowthegrounds.addDialogueLine("Err, I just know the grounds really well. Follow me!");
knowthegrounds.addDialogueLine("Okay, great! Lead the way.");

const thegym = new Dialogue(mc, "thegym", "lastDialogue");
thegym.addDialogueLine("The gym, of course. Nothing like starting the day off with a full-body workout!");
thegym.addDialogueLine("No offense, but you don't look like you work out.");
thegym.addDialogueLine("Damn it. That was probably a bit over the top.");
thegym.addDialogueLine("Sorry, bad joke. Want me to show you around?");
thegym.addDialogueLine("No worries. That would be great, thanks!");

pass.addChoice("Did you see me volunteering? No.", "didyouseeme");

const didyouseeme = new Dialogue(mc, "didyouseeme", "lastDialogue");
didyouseeme.addDialogueLine("Did you see me volunteering? No.");
didyouseeme.addDialogueLine("No need to be rude about it, mate. I was just asking.");
didyouseeme.addDialogueLine("Ouch, she hit me with the \"mate.\" Oh, well... nothing lost, nothing gained.");
didyouseeme.addDialogueLine("Not that there was much chance of gaining anything, and English girls are too stuck-up for my taste, anyway.");
didyouseeme.addDialogueLine("Everything okay here?");
didyouseeme.addDialogueLine("My guide ditched me...");
didyouseeme.addDialogueLine("Huh! That's not very nice. Are you sure she's not outside?");
didyouseeme.addDialogueLine("Yes, I checked.");
didyouseeme.addDialogueLine("Okay, then...");
didyouseeme.addDialogueLine("[mc] is still here. He'll take you.");
didyouseeme.addDialogueLine("I already asked him, and he said no.");
didyouseeme.addDialogueLine("Nonsense! He'll take you, and that's final.");
didyouseeme.addDialogueLine("Fine, I guess.");
didyouseeme.addDialogueLine("Great.");
didyouseeme.addDialogueLine("Ugh, already falling back into my old habits. That didn't take long.");

const lastDialogue = new Dialogue(mc, "lastDialogue");
lastDialogue.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Day_1,_Take_2")?.advanceQuestStep(true, "lindsey_fall");
    DevModInterface.GAME.QUEST.startQuest("Tour de School");
    EngineBus.emit(
        Transition_Scene,
        createEngineEvent(Transition_Scene, {
            sceneName: "Ground_Floor",
            sceneTransition: SceneTransitionFlags.ST_FADE,
        })
    );
});

const volunteer = new Dialogue(mc, "volunteer");
volunteer.addDialogueLine("This school is pretty big. I almost got lost on the way here. Thanks for taking me!");

volunteer.addChoice("Hey, no problem! Follow me!", "followme");
volunteer.addChoice("I could show you more than just the school...", "showmorethanschool");
volunteer.addChoice("I've changed my mind. You're on your own. Your accent hurts my ears.", "accenthurts")

const followme = new Dialogue(mc, "followme", "lastDialogue");
followme.addDialogueLine("Hey, no problem! Follow me!");
followme.addDialogueLine("All right!");
followme.addDialogueLine("It's strange talking to someone who doesn't look like they want to spit me in the face.");
followme.addDialogueLine("Just got to keep my head cool and the spaghetti in my pockets now.");

const accenthurts = new Dialogue(mc, "accenthurts");
accenthurts.addDialogueLine("I've changed my mind. You're on your own. Your accent hurts my ears.");
accenthurts.addDialogueLine("No need to be rude, mate.");
accenthurts.addDialogueLine("Hmm... that did not go as planned. Oh, well... nothing lost, nothing gained.");
accenthurts.addDialogueLine("Not that there was much chance of gaining anything, and English girls are too stuck-up for my taste, anyway.");
accenthurts.addDialogueLine("Everything okay here?");
accenthurts.addDialogueLine("My guide ditched me...");
accenthurts.addDialogueLine("Huh! That's not very nice. How come?");

accenthurts.addChoice("I was just joking! I'll take her.", "justjoking");
accenthurts.addChoice("Err, this is all a misunderstanding.", "isallmisunderstanding");

const justjoking = new Dialogue(mc, "justjoking", "accentcontinuation");
justjoking.addDialogueLine("I was just joking! I'll take her.");
justjoking.addDialogueLine("Not funny.");
justjoking.addDialogueLine("Shit. That was really stupid of me.");
justjoking.addDialogueLine("I'm sorry.");
justjoking.addDialogueLine("Glad we got that resolved.");

const isallmisunderstanding = new Dialogue(mc, "isallmisunderstanding", "accentcontinuation");
isallmisunderstanding.addDialogueLine("Err, this is all a misunderstanding.");
isallmisunderstanding.addDialogueLine("What is?");
isallmisunderstanding.addDialogueLine("I figured you'd like the bad boy type...");
isallmisunderstanding.addDialogueLine("What's wrong with you?");
isallmisunderstanding.addDialogueLine("I'm so sorry. I'll show you around.");
isallmisunderstanding.addDialogueLine("Glad we got that resolved.");

const accentcontinuation = new Dialogue(mc, "accentcontinuation", "lastDialogue");
accentcontinuation.addDialogueLine("Fine. Let's just go.");
accentcontinuation.addDialogueLine("Ugh, already falling back into my old habits. That didn't take long.");





getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(pass);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(surething);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(showmorethanschool);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(dictionary);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(knowthegrounds);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(thegym);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(didyouseeme);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(lastDialogue);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(volunteer);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(followme);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(accenthurts);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(justjoking);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(isallmisunderstanding);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(accentcontinuation);
export default HomeroomDoor;
