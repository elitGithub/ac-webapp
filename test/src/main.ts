import { Engine, EngineBus, createEngineEvent, getEngine } from "../../src/engine";
import { Load_Scene, Prep_Scenes, Transition_Scene } from "../../src/engine/scene/models/events";
import { Scene } from "../../src/engine/scene/models/scene";
import SceneTransitionFlags from "../../src/engine/scene/models/scenetransitions";
import BathRoom from "./assets/locations/home/bathroom/bathroom.webp";
import HomeHall from "./assets/locations/home/hall/homehall.webp";

Engine.init();
const div = document.createElement("div");
const app = document.getElementById("app");
if (app) {
    app.append(div);
}
else {
    document.body.append(div);
}
getEngine().getRender().attachRendererTo(div);
const bathroomScene = new Scene("TestScene", {source: BathRoom});
const hallScene = new Scene("TestScene2", {source: HomeHall});
EngineBus.emit(Prep_Scenes, createEngineEvent(Prep_Scenes, {scenes: [bathroomScene, hallScene]}));
EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {sceneName: "TestScene", sceneTransition: SceneTransitionFlags.ST_FADE}));
setTimeout(() => {
    EngineBus.emit(Transition_Scene, createEngineEvent(Transition_Scene, {sceneName: "TestScene2", sceneTransition: SceneTransitionFlags.ST_FADE}));

