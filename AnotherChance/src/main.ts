import { createEngineEvent, Engine, EngineBus, getEngine } from './Engine/engine';
import { createNamedAnimate } from './Engine/engine/rendereffects';
import TweenShape from './Engine/framework/animations/tween/models/tweenshape';
import { DevModInterface } from './Engine/modsystem';
import { Factory } from "./Factory/Factory.ts";
import { DecisionTree } from "./Factory/DecisionTree.ts";
import { AnotherChance } from "../AnotherChance.ts";
import { Transition_Scene } from "./Engine/engine/scene";
import SceneTransitionFlags from "./Engine/engine/scene/models";

Engine.init();

const anotherChance = new AnotherChance(undefined);
const factory = new Factory(new DecisionTree());
anotherChance.factory = factory;
Engine.setGame(anotherChance);

createNamedAnimate(
    "vpunchpos",
    "position",
    true,
    { x: 0, y: 200, z: 0 },
    new TweenShape(0, 0.7, 0, 0.2, 0, 0.7, 0, 0.1, 0, 0),
    true,
    true
);
createNamedAnimate(
    "vpunchneg",
    "position",
    true,
    { x: 0, y: -200, z: 0 },
    new TweenShape(0, 0.7, 0, 0.2, 0, 0.7, 0, 0.1, 0, 0),
    true,
    true
);
createNamedAnimate(
    "slide_250",
    "position",
    false,
    { x: 250, y: 0, z: 0 },
    new TweenShape(0, 0.1, 0.3, 0.5, 0.7, 0.9, 1),
    true,
    true
);
createNamedAnimate(
    "slide_1250",
    "position",
    false,
    { x: 1250, y: 0, z: 0 },
    new TweenShape(0, 0.1, 0.3, 0.5, 0.7, 0.9, 1),
    true,
    true
);


//
DevModInterface.loadModResource(await import("./characters/index"));
DevModInterface.loadModResource(await import("./quests/SmashOrPass"));
DevModInterface.loadModResource(await import("./quests/Bed"));
DevModInterface.loadModResource(await import("./Isabelle"));
DevModInterface.loadModResource(await import("./quests/naturescall"));
DevModInterface.loadModResource(await import("./quests/washhands"));
DevModInterface.loadModResource(await import("./quests/dresstonine"));
DevModInterface.loadModResource(await import("./characters/jo"));
DevModInterface.loadModResource(await import("./quests/backtoschoolspecial"));
DevModInterface.loadModResource(await import("./quests/day1_take2"));
DevModInterface.loadModResource(await import("./characters/index"));
DevModInterface.loadModResource(await import("./quests/isabelle_tour"));
DevModInterface.loadModResource(await import("./quests/thekey"));
DevModInterface.loadModResource(await import("./quests/kateoverisabelle"));
DevModInterface.loadModResource(await import("./quests/isabelleoverkate"));



// anotherChance.loader.emitPrepScenes();
// Home
// await import("./locations/home/bathroom/bathroom");
// await import("./locations/home/hall/hall");
// await import("./locations/home/kitchen/kitchen");
//
// // School
// await import("./locations/school/entrance/entrance");
// await import("./locations/school/groundfloor/grounfloor");
// await import("./locations/school/homeroom/homeroom");
// await import("./locations/school/firsthall/firsthall");
// await import("./locations/school/firsthallwest/firsthallwest");
// await import("./locations/school/artclass/artclass");
// await import("./locations/school/englishclass/englishclass");
// await import("./locations/school/firsthalleast/firsthalleast");
// await import("./locations/school/gym/gym");


(async () => {
    const div = document.createElement("div");
    const app = document.getElementById("app");
    if (app) {
        app.append(div);
    } else {
        document.body.append(div);
    }
    getEngine().getRender().attachRendererTo(div);
    await anotherChance.factory.buildLocationFromSchematics(['Bedroom', 'Bathroom']);
    EngineBus.emit(
        Transition_Scene,
        createEngineEvent(Transition_Scene, {
            sceneName: "Bedroom",
            sceneTransition: SceneTransitionFlags.ST_FADE,
        })
    );
})()
