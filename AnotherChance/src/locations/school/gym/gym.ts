import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
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
