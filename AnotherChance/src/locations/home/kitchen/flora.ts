import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import { WorldNPC } from "../../../../../src/gameplay/npc";
import Flora from "../../../../assets/locations/home/kitchen/flora_sitting.webp";

const kitchenFlora = new WorldNPC("Flora", {
    source: Flora,
});
kitchenFlora.addAction({
    action: "interact",
    handler: () => {
        EngineBus.emit(
            START_DIALOGUE,
            createEngineEvent(START_DIALOGUE, {
                dialogueId: "florab2schoolspecial",
            })
        );
        // getEngine().getGame().energy.decrement(10);
    },
});
kitchenFlora.setTransform(1201, 411);
kitchenFlora.visible = false;

export default kitchenFlora;
