import Door from "../../../../assets/locations/school/entrance/door.webp";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";

const SchoolEntranceDoor = await getEngine().createSimpleInteractable(
    "entrance_door",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                START_DIALOGUE,
                createEngineEvent(START_DIALOGUE, {
                    dialogueId: "arrived",
                })
            );
        },
    },
    { source: Door }
);
SchoolEntranceDoor.setTransform(890, 669);

export default SchoolEntranceDoor;
