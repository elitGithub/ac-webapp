import Asset from "../../../public/assets/images/locations/school/ground_floor/main_stairs.webp";
import {
    getEngine,
} from "../../../Engine/engine";
// import { DevModInterface } from "../../../Engine/modsystem";
// import { QuestState } from "../../../Engine/gameplay/quest";

const MainStairs = await getEngine().createSimpleInteractable(
    "main_stairs",
    {
        action: "interact",
        handler: () => {
            // lindseyfallingdialogue
            // if (DevModInterface.GAME.QUEST.getQuest("Day_1,_Take_2")?.getCurrentQuestStep()?.questStepId === "lindsey_fall" &&
            //     DevModInterface.GAME.QUEST.getQuest("Tour de School")?.getCurrentQuestStep()?.questStepId === "upstairs" &&
            //     DevModInterface.GAME.QUEST.getQuest("The Key")?.state === QuestState.COMPLETED) {
            //     DevModInterface.GAME.DIALOGUE.startDialogue("lindseyfallingdialogue")
            // }


            // if (DevModInterface.GAME.QUEST.getQuest("The Key")?.state === QuestState.COMPLETED) {
            //     EngineBus.emit(
            //         Transition_Scene,
            //         createEngineEvent(Transition_Scene, {
            //             sceneName: "First Hall",
            //             sceneTransition: SceneTransitionFlags.ST_FADE,
            //         })
            //     );
            // }
        },
    },
    { source: Asset }
);
MainStairs.setTransform(740, 480);

export default MainStairs;
