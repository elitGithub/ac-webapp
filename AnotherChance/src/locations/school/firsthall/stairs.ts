import Asset from "../../../../assets/locations/school/first_hall/stairs.webp";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";

const StairstoGroundHall = await getEngine().createSimpleInteractable(
    "to_ground_stairs",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Ground_Floor",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
        },
    },
    { source: Asset }
);
StairstoGroundHall.setTransform(1140, 480);

export default StairstoGroundHall;
