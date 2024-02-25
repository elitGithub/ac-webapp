import Bus from "../../../../assets/locations/school/entrance/bus.webp";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { Transition_Scene } from "../../../Engine/engine/scene";

const SchoolBus = await getEngine().createSimpleInteractable(
    "entrance_bus",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Kitchen",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: Bus }
);
SchoolBus.setTransform(1500, 669);

export default SchoolBus;
