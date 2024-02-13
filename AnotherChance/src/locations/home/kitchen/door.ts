import Door from "../../../../assets/locations/home/kitchen/door.webp";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";
import { DevModInterface } from "../../../../../src/modsystem";
import { QuestState } from "../../../../../src/gameplay/quest";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";

const KitchenDoor = await getEngine().createSimpleInteractable(
    "kitchen_door",
    {
        action: "interact",
        handler: () => {
            if (
                getEngine()
                    .getGame()
                    .questSys.findByTitle("Back to School Special")
                    .getCurrentQuestStep().questStepId === "ready_to_leave"
            ) {
                EngineBus.emit(
                    START_DIALOGUE,
                    createEngineEvent(START_DIALOGUE, {
                        dialogueId: "rreadyToLeaveDialogueead",
                    })
                );
            }
            if (
                getEngine()
                    .getGame()
                    .questSys.findByTitle("Back to School Special").state ===
                QuestState.COMPLETED
            ) {
                EngineBus.emit(
                    START_DIALOGUE,
                    createEngineEvent(START_DIALOGUE, {
                        dialogueId: "day1take2startdialogue",
                    })
                );
            }
        },
    },
    { source: Door }
);
KitchenDoor.setTransform(180, 200);

export default KitchenDoor;
