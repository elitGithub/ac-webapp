import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";
import { QuestState } from "../../../Engine/gameplay/quest";
import BathRoomDoor from "../../../../public/assets/images/locations/home/bathroom/door.webp";

const bathroomToHallDoor = await getEngine().createSimpleInteractable(
    "bathroom_door",
    {
        action: "interact",
        handler: () => {
            if (
                getEngine().getGame().questSys.findByTitle("Dress to the Nine")
                    ?.state === QuestState.IN_PROGRESS
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
