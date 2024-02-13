import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import Sky from "../../../../assets/locations/school/homeroom/sky.webp";
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
