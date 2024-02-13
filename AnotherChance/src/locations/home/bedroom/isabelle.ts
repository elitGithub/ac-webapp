import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import { WorldNPC } from "../../../../../src/gameplay/npc";
import BedroomIsabelleSprite from "../../../../assets/locations/home/bedroom/isabelle.webp";

const bedroomIsabelle = new WorldNPC("Isabelle", {
    source: BedroomIsabelleSprite,
});
bedroomIsabelle.addAction({
    action: "interact",
    handler: () => {
        EngineBus.emit(
            START_DIALOGUE,
            createEngineEvent(START_DIALOGUE, {
                dialogueId: "IsabelleBedroomBeforeQuest",
            })
        );
        getEngine().getGame().energy.decrement(10);
    },
});
bedroomIsabelle.setTransform(901, 411);

export default bedroomIsabelle;
