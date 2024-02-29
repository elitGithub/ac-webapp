import HomeHallStair from "../../../../public/assets/images/locations/home/kitchen/stairs.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";

const StairsToHall = await getEngine().createSimpleIntractable(
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
