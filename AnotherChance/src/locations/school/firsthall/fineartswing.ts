import Asset from "../../../../public/assets/images/locations/school/first_hall/walk_left.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";
import { DevModInterface } from "../../../Engine/modsystem";

const WalkToLeft = await getEngine().createSimpleIntractable(
    "walktoleft",
    {
        action: "interact",
        handler: () => {
            // english_class and talk to kate done!
            console.log(DevModInterface.GAME.QUEST.getQuest("Tour de School")?.getCurrentQuestStep()?.questStepId,
            DevModInterface.GAME.QUEST.getQuest("Kate Over Isabelle"))
            if (DevModInterface.GAME.QUEST.getQuest("Tour de School")?.getCurrentQuestStep()?.questStepId === "english_class") {
                EngineBus.emit(
                    Transition_Scene,
                    createEngineEvent(Transition_Scene, {
                        sceneName: "Arts Wing",
                        sceneTransition: SceneTransitionFlags.ST_FADE,
                    })
                );
            }

        },
    },
    { source: Asset }
);
WalkToLeft.setTransform(140, 480);

export default WalkToLeft;
