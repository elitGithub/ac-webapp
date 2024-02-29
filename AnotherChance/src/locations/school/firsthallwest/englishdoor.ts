import Door from "../../../../public/assets/images/locations/school/first_hall_west/english.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";

const EnglishDoor = await getEngine().createSimpleIntractable(
    "english_door",
    {
        action: "interact",
        handler: () => {
            // if (DevModInterface.GAME.QUEST.getQuest("Tour de School")?.state === QuestState.IN_PROGRESS) {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "English Class",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            // }

            // getEngine().getGame().energy.decrement(10);
        },
    },
    { source: Door }
);
EnglishDoor.setTransform(400, 300);

export default EnglishDoor;
