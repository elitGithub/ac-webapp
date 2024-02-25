import Asset from "../../../assets/locations/school/english_class/isabelle.webp";

import {
    getEngine,
} from "../../../Engine/engine";
import { DevModInterface } from "../../../Engine/modsystem";
import { Dialogue, DialogueSystem } from "../../../Engine/gameplay/dialogue";
import {  mc } from "../../../characters";

const IsabellCouch = await getEngine().createSimpleInteractable(
    "english_class_isabelle_couch",
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
            // const isa = DevModInterface.GAME.CHARACTER.mc
            // if (isa && isa['isabelle_volunteer']) {
            //     DevModInterface.GAME.DIALOGUE.startDialogue("volunteereddialogue");
            // } else {
            //     DevModInterface.GAME.DIALOGUE.startDialogue("passeddialogue");
            // }
        },
    },
    { source: Asset }
);
IsabellCouch.setTransform(1000, 550);


const isabelle_english_class = new Dialogue(mc, "isabelle_english_class");
isabelle_english_class.addDialogueLine(
    "I can't believe people like [kate] are allowed to walk around the school...",
    "She's always been like that, and she never gets detention or any other form of discipline.",
    "If we can't trust the authorities to do their job, we'll have to take justice into our own hands..."
);

isabelle_english_class.addChoice("What are you planning to do?", "isabelle_english_class_plan");
isabelle_english_class.addChoice("I think we should start by signing up for our focus classes. Have you decided on yours yet?", "isabelle_english_class_decided");

const isabelle_english_class_plan = new Dialogue(mc, "isabelle_english_class_plan", "isabelle_english_class_remaining");
isabelle_english_class_plan.addDialogueLine(
    "What are you planning to do?",
    "I don't know yet, but I'm sure I'll come up with something...",
    "That's funny... might be the first time I've heard those words within these walls.",
    "Sure thing, it's right next door."
)

const isabelle_english_class_decided = new Dialogue(mc, "isabelle_english_class_decided", "isabelle_english_class_remaining");
isabelle_english_class_decided.addDialogueLine(
    "I think we should start by signing up for our focus classes. Have you decided on yours yet?",
    "So, I've signed up for English now. I think art would be fun as well!",
    "I'll have to think a bit more on my third pick.",
    "Okay, let's meet in the art classroom? It's right next door.",
    "Sure. Meet you there!"
);

const isabelle_english_class_remaining = new Dialogue(mc, "isabelle_english_class_remaining")
isabelle_english_class_remaining.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "art_class");

    // Now go to art class!
})


getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(isabelle_english_class);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(isabelle_english_class_plan);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(isabelle_english_class_decided);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(isabelle_english_class_remaining);





export default IsabellCouch;
