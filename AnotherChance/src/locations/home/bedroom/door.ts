import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import { QuestState } from "../../../../../src/gameplay/quest";
import { DevModInterface } from "../../../../../src/modsystem";
import BedroomDoor from "../../../../assets/locations/home/bedroom/door.webp";
import { InteractableDescription } from "../../../huds/intdescription";

const BedroomDoorInt = await getEngine().createSimpleInteractable(
    "bedroom_door",
    {
        action: "interact",
        handler: () => {
            if (
                getEngine()
                    .getGame()
                    .questSys.findByTitle("Smash Or Pass")
                    .getCurrentQuestStep().questStepId === "P1"
            ) {
                EngineBus.emit(
                    START_DIALOGUE,
                    createEngineEvent(START_DIALOGUE, {
                        dialogueId: "DoorSmashOrPass",
                    })
                );
                return;
            } else if (
                getEngine().getGame().questSys.findByTitle("Smash Or Pass")
                    .state === QuestState.COMPLETED &&
                getEngine().getGame().questSys.findByTitle("Nature's Call")
                    .state === QuestState.CAN_START
            ) {
                EngineBus.emit(
                    Transition_Scene,
                    createEngineEvent(Transition_Scene, {
                        sceneName: "Bathroom",
                        sceneTransition: SceneTransitionFlags.ST_FADE,
                    })
                );

                // This should only run when the location is in bathroom
                DevModInterface.GAME.QUEST.startQuest("Nature's Call");

                return;
            }
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Hall",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: BedroomDoor }
);
BedroomDoorInt.setTransform(736, 398); //736,407

BedroomDoorInt.setLabel(new InteractableDescription("Door", "Da Door"));

export default BedroomDoorInt;
