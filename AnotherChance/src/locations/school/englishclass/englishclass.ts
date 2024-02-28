import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
import Bg from "../../../../public/assets/images/locations/school/english_class/english_classroom.webp";
import IsabellCouch from "./isabellereading";


const EnglishClass = new Scene("English Class", {
    source: Bg,
});

EnglishClass.addSceneObject(IsabellCouch);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [EnglishClass],
    })
);

export default EnglishClass;
