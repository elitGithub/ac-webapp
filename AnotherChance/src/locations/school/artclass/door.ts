import Door from "../../../../assets/locations/school/art_class/door.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";

const ArtDoorOut = await getEngine().createSimpleInteractable(
    "art_door_out",
    {
        action: "interact",
        handler: () => {
            // if (DevModInterface.GAME.QUEST.getQuest("Tour de School")?.state === QuestState.IN_PROGRESS) {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Arts Wing",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            // }

            // getEngine().getGame().energy.decrement(10);
        },
    },
    { source: Door }
);
ArtDoorOut.setTransform(200, 300);

export default ArtDoorOut;
