import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { Prep_Scenes, Scene } from "../../../Engine/engine/scene";
import Bg from "../../../../assets/locations/school/first_hall_west/1fwcorridor.webp";
import ArtDoor from "./artdoor";
import EnglishDoor from "./englishdoor";
import HallWestExit from "./exit";

const FirstHallWest = new Scene("Arts Wing", {
    source: Bg,
});

FirstHallWest.addSceneObject(HallWestExit);
FirstHallWest.addSceneObject(EnglishDoor);
FirstHallWest.addSceneObject(ArtDoor);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [FirstHallWest],
    }),
);

export default FirstHallWest;
