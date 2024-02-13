import { EngineBus, createEngineEvent } from "../../../../../src/engine";
import { Prep_Scenes, Scene } from "../../../../../src/engine/scene/models";
import HomeKitchen from "../../../../assets/locations/home/kitchen/kitchen.webp";
import kitchenJo from "./jo";
import StairsToHall from "./stairs";
import KitchenDoor from "./door";
import joreading from "./joreading";
import kitchenFlora from "./flora";

const HomeKitchenScene = new Scene("Kitchen", { source: HomeKitchen });

HomeKitchenScene.addSceneObject(kitchenJo);
HomeKitchenScene.addSceneObject(KitchenDoor);
HomeKitchenScene.addSceneObject(StairsToHall);
HomeKitchenScene.addSceneObject(joreading);
HomeKitchenScene.addSceneObject(kitchenFlora);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [HomeKitchenScene],
    })
);

export default HomeKitchenScene;
