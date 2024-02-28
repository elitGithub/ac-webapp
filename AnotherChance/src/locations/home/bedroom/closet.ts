import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";
import { QuestState } from "../../../Engine/gameplay/quest";
import Closet from "../../../../public/assets/locations/home/bedroom/closet.webp";

const BedroomBedCloset = await getEngine().createSimpleInteractable(
    "bedroom_closet",
    {
        action: "interact",
        handler: () => {
            if (
                getEngine().getGame().questSys.findByTitle("Dress to the Nine")
                    ?.state === QuestState.IN_PROGRESS
            ) {
                EngineBus.emit(
                    START_DIALOGUE,
                    createEngineEvent(START_DIALOGUE, {
                        dialogueId: "ClosetDialogue",
                    })
                );
                return;
            }
        },
    },
    { source: Closet }
);
let { x, y } = getEngine().SPR(0.48, 0.29);
BedroomBedCloset.setTransform(x, y);
BedroomBedCloset.addAction({ action: "interact", handler: function () {} });

export default BedroomBedCloset;
