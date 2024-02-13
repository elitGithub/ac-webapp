import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import BathRoom from "../../../../assets/locations/home/bathroom/bathroom.webp";
import bathroomToHallDoor from "./door";
import sink from "./sink";
import bathroomToilet from "./toilet";

const BathroomScene = new Scene("Bathroom", { source: BathRoom });

BathroomScene.addSceneObject(bathroomToHallDoor);
BathroomScene.addSceneObject(bathroomToilet);
BathroomScene.addSceneObject(sink);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [BathroomScene],
    })
);

export default BathroomScene;
