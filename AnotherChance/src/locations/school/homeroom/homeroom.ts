import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
import Sky from "../../../../public/assets/images/locations/school/homeroom/sky.webp";
import HomeroomDoor from "./door";
import Mrsl from "./mrsl";

const Homeroom = new Scene("Homeroom", {
    source: Sky,
});

Homeroom.addSceneObject(HomeroomDoor);
Homeroom.addSceneObject(Mrsl);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [Homeroom],
    })
);

export default Homeroom;
