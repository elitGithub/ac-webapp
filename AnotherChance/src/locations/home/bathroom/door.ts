import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import { QuestState } from "../../../../../src/gameplay/quest";
import BathRoomDoor from "../../../../assets/locations/home/bathroom/door.webp";

const bathroomToHallDoor = await getEngine().createSimpleInteractable(
    "bathroom_door",
    {
        action: "interact",
        handler: () => {
            if (
                getEngine().getGame().questSys.findByTitle("Dress to the Nine")
                    .state === QuestState.IN_PROGRESS
            ) {
                EngineBus.emit(
                    Transition_Scene,
                    createEngineEvent(Transition_Scene, {
                        sceneName: "Bedroom",
                        sceneTransition: SceneTransitionFlags.ST_FADE,
                    })
                );
                EngineBus.emit(
                    START_DIALOGUE,
                    createEngineEvent(START_DIALOGUE, {
                        dialogueId: "DresstoNine",
                    })
                );

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
    { source: BathRoomDoor }
);
bathroomToHallDoor.anchor.set(0.5);
let pos = getEngine().SPR(0.12, 0.48);
bathroomToHallDoor.setTransform(pos.x, pos.y);

export default bathroomToHallDoor;
