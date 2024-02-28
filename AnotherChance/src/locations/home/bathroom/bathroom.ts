import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
import BathRoom from "../../../../public/assets/images/locations/home/bathroom/bathroom.webp";
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
