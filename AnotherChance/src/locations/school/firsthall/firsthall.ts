import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
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
