import HomeHallStair from "../../../../assets/locations/home/kitchen/stairs.webp";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";

const StairsToHall = await getEngine().createSimpleInteractable(
    "kitchen_staurs",
    {
        action: "interact",
        handler: () => {
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
    { source: HomeHallStair }
);
StairsToHall.setTransform(0, 0);

export default StairsToHall;
