import Asset from "../../../public/assets/images/locations/school/gym/isabelle.webp";

import {
    getEngine,
} from "../../../Engine/engine";
import { DevModInterface } from "../../../Engine/modsystem";
import { Dialogue, DialogueSystem } from "../../../Engine/gameplay/dialogue";
import { mc } from "../../../characters";

const Isabelle = await getEngine().createSimpleIntractable(
    "gym_isabelle",
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
Isabelle.setTransform(1000, 550);


const tourgym = new Dialogue(mc, "tourgym");
tourgym.addDialogueLine(
    "Thanks for showing me around, [mc]!",
    "Apart from the run-in with [kate], this was quite the pleasant tour.",
    "No problem!"
);

const kateoverisa = new Dialogue(mc, "kateoverisa");
kateoverisa.addDialogueLine(
    "The story with [kate] is, however, far from over...",
    "[isabelle] has no idea what's coming. It feels a little bad, but such is life.",
    "Hey, would you like me to show you the cafeteria as well?",
    "Yeah, no worries. The food isn't amazing, but the strawberry juice is the best!",
    "Cool, let's meet up there."
);
kateoverisa.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Kate Over Isabelle")?.advanceQuestStep(true, "spy_drink");
})

const isaoverkate = new Dialogue(mc, "isaoverkate");
isaoverkate.addDialogueLine(
    "The story with [kate] is, however, far from over...",
    "[isabelle] has no idea what's coming. I need to make sure she's safe.",
    "Have you thought about the [kate] problem?",
    "Yeah, we need to do something about her...",
    "Meet me in the cafeteria and we'll come up with a plan.",
    "Sounds good."
);
isaoverkate.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Isabelle Over Kate")?.advanceQuestStep(true, "meeting")
})



getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(tourgym);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(isaoverkate);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(kateoverisa);




export default Isabelle;
