import { IEngineEvent } from "../../../engine";

export const START_QUEST = Symbol("QUEST_REQ_START_EVENT");
export const ADVANCE_QUEST = Symbol("QUEST_REQ_ADVANCE_EVENT");
export const COMPLETE_QUEST = Symbol("QUEST_REQ_COMPLETE_EVENT");

export const QUEST_STARTED = Symbol("QUEST_STARTED_EVENT");
export const QUEST_STEP_STARTED = Symbol("QUEST_STEP_STARTED");
export const QUEST_COMPLETED = Symbol("QUEST_COMPLETED_EVENT");
export const QUEST_FAILED = Symbol("QUEST_FAILED_EVENT");

export const QUEST_TRACKER_CHANGE = Symbol("QUEST_TRACKER_CHANGE_EVENT");


export interface StartQuestEvent extends IEngineEvent {
    quest: string;
}

export interface AdvanceQuestEvent extends IEngineEvent {
    quest: string;
    step?: string;
}

export interface QuestTrackerChangeEvent extends IEngineEvent {
    quest: string;
}