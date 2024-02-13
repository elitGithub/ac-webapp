import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import Sink from "../../../../assets/locations/home/bathroom/sink.webp";

const sink = await getEngine().createSimpleInteractable(
    "bathroom_sink",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                START_DIALOGUE,
                createEngineEvent(START_DIALOGUE, {
                    dialogueId: "WashHandsDialogue",
                })
            );
        },
    },
    { source: Sink }
);
sink.anchor.set(0.5);
let pos = getEngine().SPR(0.8, 0.5);
sink.setTransform(pos.x, pos.y);

export default sink;
