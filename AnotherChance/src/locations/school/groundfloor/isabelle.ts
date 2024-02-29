import Asset from "../../../public/assets/images/locations/school/ground_floor/isabelle.webp";

import {
    getEngine,
} from "../../../Engine/engine";
import { DevModInterface } from "../../../Engine/modsystem";

const Isabelle = await getEngine().createSimpleIntractable(
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
