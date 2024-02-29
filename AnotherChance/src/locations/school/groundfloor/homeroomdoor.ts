import Door from "../../../../public/assets/images/locations/school/ground_floor/homeroom.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";
import { DevModInterface } from "../../../Engine/modsystem";

const HomeroomDoor = await getEngine().createSimpleIntractable(
    "homeroom_door",
    {
        action: "interact",
        handler: () => {
            const q = DevModInterface.GAME.QUEST?.getQuest("Day_1,_Take_2")?.getCurrentQuestStep();
            if (q.questStepId === "entered") {
                EngineBus.emit(
                    START_DIALOGUE,
                    createEngineEvent(START_DIALOGUE, {
                        dialogueId: "homeroomDialogue",
                    })
                );
            } else {
                EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {
                    sceneName: "Homeroom",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                }))
            }

        },
    },
    { source: Door }
);
HomeroomDoor.setTransform(480, 550);

export default HomeroomDoor;
