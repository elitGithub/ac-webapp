import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
import School from "../../../../assets/locations/school/entrance/school.webp";
import SchoolEntranceDoor from "./door";
import SchoolBus from "./bus";

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
