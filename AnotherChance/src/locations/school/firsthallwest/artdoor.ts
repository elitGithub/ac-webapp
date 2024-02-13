import Door from "../../../../assets/locations/school/first_hall_west/art.webp";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";
import { Dialogue, DialogueSystem } from "../../../../../src/gameplay/dialogue";
import { mc } from "../../../characters";
import { DevModInterface } from "../../../../../src/modsystem";

const ArtDoor = await getEngine().createSimpleInteractable(
    "art_door",
    {
        action: "interact",
        handler: () => {
            // if (DevModInterface.GAME.QUEST.getQuest("Tour de School")?.state === QuestState.IN_PROGRESS) {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Art Class",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            // }

            // getEngine().getGame().energy.decrement(10);
        },
    },
    { source: Door }
);
ArtDoor.setTransform(200, 300);

export default ArtDoor;
