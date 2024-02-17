import { Dialogue } from "..";
import { EngineBus, IEngineEvent, createEngineEvent } from "../../../engine";

export const START_DIALOGUE = Symbol("DIALOGUE_START_EVENT");
export const ADVANCE_DIALOGUE = Symbol("DIALOGUE_NEXT_LINE_EVENT");
export const SELECT_DIALOGUE_CHOICE = Symbol("DIALOGUE_CHOICE_SELECT_EVENT");

export const DIALOGUE_STARTED = Symbol("DIALOGUE_STARTED_EVENT");
export const DIALOGUE_ADVANCED = Symbol("DIALOGUE_ADVANCED_EVENT")
export const DIALOGUE_ENDED = Symbol("DIALOGUE_ENDED_EVENT");

export interface StartDialogueEvent extends IEngineEvent {
    dialogueId: string;
    category?: string;
}

export interface AdvanceDialogueEvent extends IEngineEvent {
    choice?: number;
}

export interface SelectDialogueChoiceEvent extends IEngineEvent {
    choice: number;
}

export interface DialogueUpdateEvent extends IEngineEvent {
    dialogueId: string;
    dialogueLine: number;
    displayingChoice: boolean;
    ended: boolean;
}

export function createDialogueUpdateEvent(event: Symbol, dialogueId: string, ended: boolean, dialogueLine: number, displayingChoice: boolean = false) {
    return createEngineEvent(event, {dialogueId, ended, dialogueLine, displayingChoice});
}

export interface DialogueListener {
    onDialogueStart(event: IEngineEvent): void;
    onDialogueAdvance(event: IEngineEvent): void;
    onDialogueEnd(event: IEngineEvent): void;
}

export function subscribeToDialogueEvents(listener: DialogueListener) {
    EngineBus.on(DIALOGUE_STARTED, listener.onDialogueStart.bind(listener));
    EngineBus.on(DIALOGUE_ADVANCED, listener.onDialogueAdvance.bind(listener));
    EngineBus.on(DIALOGUE_ENDED, listener.onDialogueEnd.bind(listener));
}