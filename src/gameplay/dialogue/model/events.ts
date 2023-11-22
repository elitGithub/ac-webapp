import { IEngineEvent } from "../../../engine";

export const START_DIALOGUE = Symbol("DIALOGUE_START_EVENT");
export const ADVANCE_DIALOGUE = Symbol("DIALOGUE_NEXT_LINE_EVENT");
export const SELECT_DIALOGUE_CHOICE = Symbol("DIALOGUE_CHOICE_SELECTED");

export interface StartDialogueEvent extends IEngineEvent {
    dialogueId: string;
}

export interface SelectDialogueChoiceEvent extends IEngineEvent {
    choice: number;
}