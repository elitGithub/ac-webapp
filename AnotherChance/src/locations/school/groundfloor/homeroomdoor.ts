import Door from "../../../../assets/locations/school/ground_floor/homeroom.webp";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import { DevModInterface } from "../../../../../src/modsystem";
import { QuestState } from "../../../../../src/gameplay/quest";

const HomeroomDoor = await getEngine().createSimpleInteractable(
    "homeroom_door",
    {
        action: "interact",
        handler: () => {
            const q = DevModInterface.GAME.QUEST.getQuest("Day_1,_Take_2")?.getCurrentQuestStep();
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
