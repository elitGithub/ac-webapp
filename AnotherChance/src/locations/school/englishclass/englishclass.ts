import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import Bg from "../../../../assets/locations/school/english_class/english_classroom.webp";
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
