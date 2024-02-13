import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import { WorldNPC } from "../../../../../src/gameplay/npc";
import { DevModInterface } from "../../../../../src/modsystem";
import Jo from "../../../../assets/locations/home/kitchen/jo_newspaper.webp";

const joreading = new WorldNPC("Jo", {
    source: Jo,
});

joreading.addAction({
    action: "interact",
    handler: () => {
        EngineBus.emit(
            START_DIALOGUE,
            createEngineEvent(START_DIALOGUE, {
                dialogueId: "JoKitchenQuestReading",
            })
        );
        console.log("jo reading");

        // getEngine().getGame().energy.decrement(10);
    },
});
joreading.setTransform(501, 411);

export default joreading;
