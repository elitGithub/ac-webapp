import Asset from "../../../../assets/locations/school/first_hall/stairs.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";

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
