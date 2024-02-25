import Asset from "../../../assets/locations/school/ground_floor/lindsey.webp";

import {
    getEngine,
} from "../../../Engine/engine";

const Lindsey = await getEngine().createSimpleInteractable(
    "school_lindsey",
    {
        action: "interact",
        handler: () => {
            // EngineBus.emit(
            //     Transition_Scene,
            //     createEngineEvent(Transition_Scene, {
            //         sceneName: "Entrance",
            //         sceneTransition: SceneTransitionFlags.ST_FADE,
            //     })
            // );
            // getEngine().getGame().energy.decrement(10);
        },
    },
    { source: Asset }
);
Lindsey.setTransform(600, 550);
Lindsey.visible = false;

export default Lindsey;
