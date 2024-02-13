import Door from "../../../../assets/locations/school/entrance/door.webp";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";

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
