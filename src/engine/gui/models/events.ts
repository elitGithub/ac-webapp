import { IEngineEvent } from "../..";

export const TOGGLE_HUD = Symbol("HUD_ELEMENT_TOGGLE");

export interface HudElementToggleEvent extends IEngineEvent{
    hudname: string;
    force?: boolean;
}