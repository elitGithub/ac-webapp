import Door from "../../../../public/assets/images/locations/home/kitchen/door.webp";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { QuestState } from "../../../Engine/gameplay/quest";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";

const KitchenDoor = await getEngine().createSimpleIntractable(
    "kitchen_door",
    {
        action: "interact",
        handler: () => {
            if (
                getEngine()
                    ?.getGame()
                    ?.questSys?.findByTitle("Back to School Special")
                    ?.getCurrentQuestStep()?.questStepId === "ready_to_leave"
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
