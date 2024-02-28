import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../Engine/engine";
import { START_DIALOGUE } from "../../../Engine/gameplay/dialogue";
import BedroomAlarm from "../../../../public/assets/images/locations/home/bedroom/alarm.webp";

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
