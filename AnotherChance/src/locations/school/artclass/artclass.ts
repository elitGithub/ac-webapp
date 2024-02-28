import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
import Bg from "../../../../public/assets/images/locations/school/art_class/art_class.webp";
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
