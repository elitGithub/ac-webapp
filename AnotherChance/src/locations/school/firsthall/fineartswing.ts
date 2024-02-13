import Asset from "../../../../assets/locations/school/first_hall/walk_left.webp";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";
import { DevModInterface } from "../../../../../src/modsystem";
import { QuestState } from "../../../../../src/gameplay/quest";

const WalkToLeft = await getEngine().createSimpleInteractable(
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
