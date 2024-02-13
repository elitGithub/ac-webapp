import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import GroundFloor from "../../../../assets/locations/school/ground_floor/background.webp";

import HomeroomDoor from "./homeroomdoor";
import SchoolExitArrow from "./exit";
import MainStairs from "./mainstairs";
import Lindsey from "./lindsey";
import Isabelle from "./isabelle";
import GuardBoot from "./guardbooth";

const SchoolGroundFloorScene = new Scene("Ground_Floor", {
    source: GroundFloor,
});

SchoolGroundFloorScene.addSceneObject(HomeroomDoor);
SchoolGroundFloorScene.addSceneObject(SchoolExitArrow);
SchoolGroundFloorScene.addSceneObject(MainStairs);
SchoolGroundFloorScene.addSceneObject(Lindsey);
SchoolGroundFloorScene.addSceneObject(Isabelle);
SchoolGroundFloorScene.addSceneObject(GuardBoot);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [SchoolGroundFloorScene],
    })
);

export default SchoolGroundFloorScene;
