
import { InteractableDescription } from "../../../huds/intdescription";
import { createEngineEvent, EngineBus, getEngine } from "../../../Engine/engine";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";
import { QuestState } from "../../../Engine/gameplay/quest";
import { Transition_Scene } from "../../../Engine/engine/scene";
import SceneTransitionFlags from "../../../Engine/engine/scene/models";
import { DevModInterface } from "../../../Engine/modsystem";

const BedroomDoorInt = await getEngine().createSimpleInteractable(
    "bedroom_door",
    {
        action: "interact",
        handler: () => {
            if (
                getEngine()
                    ?.getGame()
                    ?.questSys.findByTitle("Smash Or Pass")
                    ?.getCurrentQuestStep()?.questStepId === "P1"
            ) {
                EngineBus.emit(
                    START_DIALOGUE,
                    createEngineEvent(START_DIALOGUE, {
                        dialogueId: "DoorSmashOrPass",
                    })
                );
                return;
            } else if (
                getEngine()?.getGame()?.questSys?.findByTitle("Smash Or Pass")
                    ?.state === QuestState.COMPLETED &&
                getEngine().getGame().questSys.findByTitle("Nature's Call")
                    ?.state === QuestState.CAN_START
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
