import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import {
    Prep_Scenes,
    Scene,
    Transition_Scene,
} from "../../../Engine/engine/scene";
import SceneTransitionFlags from "../../../Engine/engine/scene/models/scenetransitions";
import HomeHall from "../../../../public/assets/images/locations/home/hall/homehall.webp";
import HomeHallDoor from "../../../../public/assets/images/locations/home/hall/door_right.webp";
import HomeHallBathroomDoor from "../../../../public/assets/images/locations/home/hall/door_white.webp";
import HomeHallStairs from "../../../../public/assets/images/locations/home/hall/stairs.webp";

const HomeHallScene = new Scene("Hall", { source: HomeHall });

const HallToBedroomDoor = await getEngine().createSimpleSceneInteractable(
    "hall_door",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Bedroom",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: HomeHallDoor },
    HomeHallScene
);
HallToBedroomDoor.setTransform(1512, 63);

//Bathroom Door

const HallToBathroomDoor = await getEngine().createSimpleSceneInteractable(
    "HallToBathroomDoor",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Bathroom",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: HomeHallBathroomDoor },
    HomeHallScene
);
HallToBathroomDoor.setTransform(1328, 235);

const HomeHallKitchenStairs = await getEngine().createSimpleSceneInteractable(
    "hall_stairs",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                Transition_Scene,
                createEngineEvent(Transition_Scene, {
                    sceneName: "Kitchen",
                    sceneTransition: SceneTransitionFlags.ST_FADE,
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: HomeHallStairs },
    HomeHallScene
);
HomeHallKitchenStairs.setTransform(83, 705);

EngineBus.emit(
    Prep_Scenes,
    createEngineEvent(Prep_Scenes, {
        scenes: [HomeHallScene],
    })
);

export default HomeHallScene;
