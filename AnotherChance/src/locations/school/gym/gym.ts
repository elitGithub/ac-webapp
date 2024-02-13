import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import Bg from "../../../../assets/locations/school/gym/gym.webp";

const Gym = new Scene("Gym", {
    source: Bg,
});


EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [Gym],
    })
);

export default Gym;
