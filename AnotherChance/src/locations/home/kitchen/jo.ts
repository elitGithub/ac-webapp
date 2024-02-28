import { EngineBus, createEngineEvent } from "../../../Engine/engine";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";
import { WorldNPC } from "../../../Engine/gameplay/npc";
import JoCoffee from "../../../../public/assets/images/locations/home/kitchen/jo_coffee.webp";

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
