import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";
import BedroomBed from "../../../../public/assets/images/locations/home/bedroom/bed.webp";

const BedroomBedInt = await getEngine().createSimpleIntractable(
    "bedroom_bed",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                START_DIALOGUE,
                createEngineEvent(START_DIALOGUE, {
                    dialogueId: "BedDefaultDial",
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: BedroomBed }
);
BedroomBedInt.setTransform(315, 539);
BedroomBedInt.addAction({ action: "interact", handler: function () {} });

export default BedroomBedInt;
