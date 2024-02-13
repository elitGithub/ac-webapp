import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import Bg from "../../../../assets/locations/school/first_hall/background.webp";
import WalkToLeft from "./fineartswing";
import Isabelle from "./isabelle";
import Kate from "./kate";
import SportsWing from "./sportswing";
import StairstoGroundHall from "./stairs";

const FirstHall = new Scene("First Hall", {
    source: Bg,
});

FirstHall.addSceneObject(StairstoGroundHall);
FirstHall.addSceneObject(Isabelle);
FirstHall.addSceneObject(Kate);
FirstHall.addSceneObject(WalkToLeft);
FirstHall.addSceneObject(SportsWing);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [FirstHall],
    })
);

export default FirstHall;
