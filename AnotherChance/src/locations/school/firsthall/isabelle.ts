import Asset from "../../../assets/locations/school/first_hall/isabelle.webp";

import {
    getEngine,
} from "../../../Engine/engine";
import { DevModInterface } from "../../../Engine/modsystem";
import { Dialogue, DialogueSystem } from "../../../Engine/gameplay/dialogue";
import { mc } from "../../../characters";

const Isabelle = await getEngine().createSimpleInteractable(
    "firsthall_isabelle",
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
            const isa = DevModInterface.GAME.CHARACTER.mc
            if (isa && isa['isabelle_volunteer']) {
                DevModInterface.GAME.DIALOGUE.startDialogue("volunteereddialogue");
            } else {
                DevModInterface.GAME.DIALOGUE.startDialogue("passeddialogue");
            }
        },
    },
    { source: Asset }
);
Isabelle.setTransform(1000, 550);

const volunteereddialogue = new Dialogue(mc, "volunteereddialogue");
volunteereddialogue.addDialogueLine(
    "I saw [kate] on the way up.",
    "She gave me this smug look... as if she took some kind of twisted pleasure in ditching me earlier.",
);

volunteereddialogue.addChoice("Best you can do is keep your head down.", "bestyoucando");
volunteereddialogue.addChoice("She probably doesn't understand what a great opportunity it is.", "shedoesntunderstand");
volunteereddialogue.addChoice("I'll go talk to her and make sure she apologizes.", "talktoher");

const bestyoucando = new Dialogue(mc, "bestyoucando");
bestyoucando.addDialogueLine(
    "Best you can do is keep your head down.",
    "I don't think I will. She needs to learn some manners...",
    "Trust me, you don't want to push her.",
    "Bullies make me sick! I'm going to have a word with her... are you coming or not?"
);

const shedoesntunderstand = new Dialogue(mc, "shedoesntunderstand", "tourfirsthalld");
shedoesntunderstand.addDialogueLine(
    "She probably doesn't understand what a great opportunity it is.",
    "A great opportunity for what?",
    "To meet a new person and exchange experiences!",
    "Aw, I like that mindset!",
    "Playing Super Seducer is finally paying off! Hell yeah."
);

const talktoher = new Dialogue(mc, "talktoher");
talktoher.addDialogueLine(
    "I'll go talk to her and make sure she apologizes.",
    "That's so nice!",
    "I'm sorry for misjudging your character. You're more than meets the eye."
);

talktoher.addChoice("On second thought, that's a terrible idea...", "onsecondthought");
talktoher.addChoice("I've always wanted to set her straight. It's about damn time!", "abouttime");

const onsecondthought = new Dialogue(mc, "onsecondthought", "firsthallending");
onsecondthought.addDialogueLine(
    "On second thought, that's a terrible idea...",
    "Really? Did your spine turn to rubber all of a sudden?",
    "Bullies make me sick! I'm going to have a word with her... are you coming or not?"
);

const abouttime = new Dialogue(mc, "abouttime");
abouttime.addDialogueLine(
    "I've always wanted to set her straight. It's about damn time!",
    "Definitely! Let's go!",
    "Shit... this might just be the worst idea ever."
);
abouttime.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "confrontation_side_isabelle");
})


const passeddialogue = new Dialogue(mc, "passeddialogue");
passeddialogue.addDialogueLine(
    "Who is the bored-looking blonde over there?",
    "That's [kate]. She's the head cheerleader, mean-bean extraordinaire, and future prom queen.",
    "On the way up the stairs, I overheard her calling you all sorts of nasty things for volunteering.",
    "That's... let's just ignore that...",
    "Ignore it? Why?",
    "Crap. How do you tell someone that you're everyone's punching bag?"
)

passeddialogue.addChoice("You're new here... some things just aren't worth it.", "newhere");
passeddialogue.addChoice("I'm used to it.", "usedtoit");
passeddialogue.addChoice("She's probably just jealous that I got to hang out with the cute new girl first.", "probablyjealous");

const newhere = new Dialogue(mc, "newhere", "firsthallending");
newhere.addDialogueLine(
    "You're new here... some things just aren't worth it.",
    "And some things are absolutely worth it!",
    "I've seen this all before, and it makes everyone miserable... even her.",
    "I think you're wrong. [kate] takes great pleasure in this.",
    "...",
    "I'm going to have a word with her. Are you coming or not?",
);

const usedtoit = new Dialogue(mc, "usedtoit", "firsthallending");
usedtoit.addDialogueLine(
    "I'm used to it.",
    "That's one of the saddest things I've heard. You need to stand up for yourself...",
    "Right... because that's such an easy thing to do.",
    "Bullies make me sick! I'm going to have a word with her... are you coming or not?"
)

const probablyjealous = new Dialogue(mc, "probablyjealous", "tourfirsthalld");
probablyjealous.addDialogueLine(
    "She's probably just jealous that I got to hang out with the cute new girl first.",
    "Aw, that's so sweet!",
);

const tourfirsthalld = new Dialogue(mc, "tourfirsthalld");
tourfirsthalld.addDialogueLine(
    "But her behavior is unacceptable! I'm going to have a word with her.",
);

tourfirsthalld.addChoice("I've always wanted to set her straight... it's about damn time.", "wantedherstraight");
tourfirsthalld.addChoice("That's not a good idea.", "notgoodidea");
tourfirsthalld.addChoice("Is making enemies really the best way to start off the year?", "offtheyear");

const wantedherstraight = new Dialogue(mc, "wantedherstraight");
wantedherstraight.addDialogueLine(
    "I've always wanted to set her straight... it's about damn time.",
    "Definitely! Let's go!",
    "Things are different now. At least, on paper... hopefully?",
    "Shit... this might just be the worst idea ever."
);
wantedherstraight.addDialogueEventAction( () => {
    DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "confrontation_side_isabelle");
});

const notgoodidea = new Dialogue(mc, "notgoodidea");
notgoodidea.addDialogueLine(
    "That's not a good idea.",
    "I think it's a perfect idea! We can't allow this type of behavior.",
    "This is how you end up in a dumpster. Don't try to break the status quo.",
    "Sorry, but that's what I'm all about.",
    "I'm going to have a word with her... are you coming or not?",
);

const offtheyear = new Dialogue(mc, "offtheyear")
offtheyear.addDialogueLine(
    "Is making enemies really the best way to start off the year?",
    "I suppose it's not...",
    "But with people like her, you have to nip that attitude in the bud! Otherwise, they'll just keep doing it...",
    "I'm going to have a word with her. Are you coming or not?"
)


const firsthallending = new Dialogue(mc, "firsthallending");
firsthallending.addChoice("Ugh, I guess...", "iguess");
firsthallending.addChoice("No, I've made that mistake before...", "imademistake");

const iguess = new Dialogue(mc, "iguess", "firsthallendingcontinue");
iguess.addDialogueLine(
    "Ugh, I guess...",
    "Let's go!"
);

const imademistake = new Dialogue(mc, "imademistake", "firsthallendingcontinue");
imademistake.addDialogueLine(
    "No, I've made that mistake before...",
    "Why did I expect more?",
    "I'll go alone."
)

const firsthallendingcontinue = new Dialogue(mc, "firsthallendingcontinue");
firsthallendingcontinue.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "confrontation_side_kate");
})

getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(passeddialogue);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(volunteereddialogue);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(bestyoucando);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(firsthallending);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(firsthallendingcontinue);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(iguess);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(imademistake);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(newhere);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(usedtoit);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(probablyjealous);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(tourfirsthalld);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(wantedherstraight);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(notgoodidea);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(offtheyear);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(shedoesntunderstand);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(onsecondthought);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(abouttime);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(talktoher);



export default Isabelle;
