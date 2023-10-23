import { Engine, EngineBus, createEngineEvent, getEngine } from "../../src/engine";
import { Load_Scene, Prep_Scenes } from "../../src/engine/scene/models/events";
import { Scene } from "../../src/engine/scene/models/scene";
import BathRoom from "./assets/locations/home/bathroom/bathroom.webp";

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
EngineBus.emit(Prep_Scenes, createEngineEvent(Prep_Scenes, {scenes: [bathroomScene]}));
EngineBus.emit(Load_Scene, createEngineEvent(Load_Scene, {sceneName: "TestScene"}));
