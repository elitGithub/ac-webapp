import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
import Bg from "../../../../assets/locations/school/first_hall_east/1fecorridor.webp";
import GymDoor from "./gymdoor";

const FirstHallEast = new Scene("Sports Wing", {
    source: Bg,
});

FirstHallEast.addSceneObject(GymDoor);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [FirstHallEast],
    }),
);

export default FirstHallEast;
