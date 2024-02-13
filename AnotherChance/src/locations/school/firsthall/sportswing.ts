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

const SportsWing = await getEngine().createSimpleInteractable(
    "sports_wing",
    {
        action: "interact",
        handler: () => {
            // console.log(DevModInterface.GAME.QUEST.getQuest("Tour de School")?.getCurrentQuestStep()?.questStepId, 
            // DevModInterface.GAME.QUEST.getQuest("Kate Over Isabelle"))
            // if (DevModInterface.GAME.QUEST.getQuest("Tour de School")?.getCurrentQuestStep()?.questStepId === "english_class" &&
            //     DevModInterface.GAME.QUEST.getQuest("Kate Over Isabelle")?.state === QuestState.IN_PROGRESS) {
                EngineBus.emit(
                    Transition_Scene,
                    createEngineEvent(Transition_Scene, {
                        sceneName: "Sports Wing",
                        sceneTransition: SceneTransitionFlags.ST_FADE,
                    })
                );
            // }

        },
    },
    { source: Asset }
);
SportsWing.setTransform(1540, 480);

export default SportsWing;
