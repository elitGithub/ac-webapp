import { EngineBus, createEngineEvent, getEngine } from "../../../../../src/engine";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import { WorldNPC } from "../../../../../src/gameplay/npc";
import { DevModInterface } from "../../../../../src/modsystem";
import JoCoffee from "../../../../assets/locations/home/kitchen/jo_coffee.webp";

const kitchenJo = new WorldNPC("Jo", {
    source: JoCoffee,
});
kitchenJo.addAction({
    action: "interact",
    handler: () => {
        EngineBus.emit(
            START_DIALOGUE,
            createEngineEvent(START_DIALOGUE, {
                dialogueId: "JoKitchenQuestReading",
            })
        );

        // getEngine().getGame().energy.decrement(10);
    },
});
kitchenJo.setTransform(901, 411);

export default kitchenJo;
