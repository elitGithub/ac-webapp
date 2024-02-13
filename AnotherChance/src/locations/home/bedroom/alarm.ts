import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import BedroomAlarm from "../../../../assets/locations/home/bedroom/alarm.webp";

const BedroomAlarmInt = await getEngine().createSimpleInteractable(
    "bedroomAlarmClock",
    {
        action: "interact",
        handler: () => {
            EngineBus.emit(
                START_DIALOGUE,
                createEngineEvent(START_DIALOGUE, {
                    dialogueId: "AlarmClockDialogue",
                })
            );
            getEngine().getGame().energy.decrement(10);
        },
    },
    { source: BedroomAlarm }
);
BedroomAlarmInt.setTransform(305, 704);

export default BedroomAlarmInt;
