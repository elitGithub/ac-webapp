import ExitArrow from "../../../../assets/locations/school/ground_floor/arrow_down.webp";
import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";

const HallWestExit = await getEngine().createSimpleInteractable(
    "west_hall_exit",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "First Hall",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: ExitArrow }
);
HallWestExit.setTransform(960, 1000);

export default HallWestExit;
