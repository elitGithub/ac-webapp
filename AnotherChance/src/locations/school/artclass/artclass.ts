import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import Bg from "../../../../assets/locations/school/art_class/art_class.webp";
import ArtDoorOut from "./door";
import IsabelleArt from "./isabelle";


const ArtClass = new Scene("Art Class", {
    source: Bg,
});

ArtClass.addSceneObject(ArtDoorOut);
ArtClass.addSceneObject(IsabelleArt);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [ArtClass],
    })
);

export default ArtClass;
