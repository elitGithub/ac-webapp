import { EngineBus, EngineSystem, IEngineEvent } from "../../engine";
import { ADVANCE_DIALOGUE, SELECT_DIALOGUE_CHOICE, START_DIALOGUE } from "./model";

export class DialogueSystem implements EngineSystem {

    constructor() {
        EngineBus.on(START_DIALOGUE, this.queue.bind(this));
        EngineBus.on(ADVANCE_DIALOGUE, this.queue.bind(this));
        EngineBus.on(SELECT_DIALOGUE_CHOICE, this.queue.bind(this));
    }

    startDialogue() {

    }

    advanceDialogue() {

    }

    handleDialogueChoice() {

    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === START_DIALOGUE) {

        }
        else if (engineEvent.event === ADVANCE_DIALOGUE) {

        }
        else if (engineEvent.event === SELECT_DIALOGUE_CHOICE) {

        }
    }

    update(time: number): void {
        throw new Error("Method not implemented.");
    }
    
}