import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import School from "../../../../assets/locations/school/entrance/school.webp";
import SchoolSky from "./sky";
import SchoolEntranceDoor from "./door";
import SchoolBus from "./bus";
import SkyNight from "./nightsky";

const SchoolEntranceScene = new Scene("Entrance", {
    source: School,
});

// SchoolEntranceScene.addSceneObject(SchoolSky);
// SchoolEntranceScene.addSceneObject(SkyNight);
SchoolEntranceScene.addSceneObject(SchoolEntranceDoor);
SchoolEntranceScene.addSceneObject(SchoolBus);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [SchoolEntranceScene],
    })
);

export default SchoolEntranceScene;
