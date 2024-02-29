import Asset from "../../../public/assets/images/locations/school/english_class/isabelle.webp";

import {
    getEngine,
} from "../../../Engine/engine";
import { DevModInterface } from "../../../Engine/modsystem";
import { Dialogue, DialogueSystem } from "../../../Engine/gameplay/dialogue";
import { mc } from "../../../characters";

const IsabelleArt = await getEngine().createSimpleIntractable(
    "art_class_isabelle",
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
IsabelleArt.setTransform(1000, 550);


const isabelle_art = new Dialogue(mc, "isabelle_art");
isabelle_art.addDialogueLine(
    "[jacklyn] seems nice! I'm really looking forward to taking her classes.",
    "What? You don't think so?",
    "It's all right... I'll look after you.",
    "Ugh, she's too nice for this place.",
    "Come on, let's get it over with!",
);
isabelle_art.addDialogueEventAction(() => {
    DevModInterface.GAME.QUEST.getQuest("Tour de School")?.advanceQuestStep(true, "gym")
})


getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(isabelle_art);


export default IsabelleArt;
