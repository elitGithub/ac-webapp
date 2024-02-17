import { EngineBus, createEngineEvent } from "../../src/engine";
import { Transition_Scene } from "../../src/engine/scene";
import SceneTransitionFlags from "../../src/engine/scene/models/scenetransitions";

EngineBus.emit(
    Transition_Scene,
    createEngineEvent(Transition_Scene, {
        sceneName: "Bedroom",
        sceneTransition: SceneTransitionFlags.ST_FADE,
    })
);
