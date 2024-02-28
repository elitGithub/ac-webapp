import Asset from "../../../../public/assets/images/locations/school/first_hall/walk_left.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";

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
