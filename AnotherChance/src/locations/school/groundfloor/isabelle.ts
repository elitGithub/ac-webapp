import Asset from "../../../assets/locations/school/ground_floor/isabelle.webp";

import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Transition_Scene } from "../../../../../src/engine/scene/models";
import { DevModInterface } from "../../../../../src/modsystem";

const Isabelle = await getEngine().createSimpleInteractable(
    "school_isabelle",
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
            DevModInterface.GAME.DIALOGUE.startDialogue("tourdialogue");
        },
    },
    { source: Asset }
);
Isabelle.setTransform(1000, 550);
Isabelle.visible = false;

export default Isabelle;
