import { IEngineEvent } from "../../../engine";

export const START_QUEST = Symbol("QUEST_REQ_START_EVENT");
export const ADVANCE_QUEST = Symbol("QUEST_REQ_ADVANCE_EVENT");

export const QUEST_STARTED = Symbol("QUEST_STARTED_EVENT");
export const QUEST_STEP_STARTED = Symbol("QUEST_STEP_STARTED");


export interface StartQuestEvent extends IEngineEvent {
    quest: string;
}

export interface AdvanceQuestEvent extends IEngineEvent {
    quest: string;
    step?: string;
}