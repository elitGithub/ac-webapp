import ExitArrow from "../../../../assets/locations/school/ground_floor/arrow_down.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";

const SchoolExitArrow = await getEngine().createSimpleInteractable(
    "school_exit",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Entrance",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: ExitArrow }
);
SchoolExitArrow.setTransform(960, 1000);

export default SchoolExitArrow;
