import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene";
import Bedroom from "../../../../assets/locations/home/bedroom/bedroom.webp";
import BedroomAlarmInt from "./alarm";
import BedroomBedInt from "./bed";
import BedroomBedCloset from "./closet";
import BedroomDoorInt from "./door";
import bedroomIsabelle from "./isabelle";
import BedroomTVInt from "./tv";

const BedroomScene = new Scene("Bedroom", { source: Bedroom });

BedroomScene.addSceneObject(BedroomBedCloset);
BedroomScene.addSceneObject(BedroomDoorInt);
BedroomScene.addSceneObject(bedroomIsabelle);
BedroomScene.addSceneObject(BedroomBedInt);
BedroomScene.addSceneObject(BedroomTVInt);
BedroomScene.addSceneObject(BedroomAlarmInt);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [BedroomScene],
    })
);

export default BedroomScene;
