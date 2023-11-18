import { IEngineEvent } from "../../../engine";

export const INVENTORY_ADD_ITEM = Symbol("INVENTORY_ADD_ITEM_EVENT");
export const INVENTORY_REMOVE_ITEM = Symbol("INVENTORY_REMOVE_ITEM_EVENT");

export const INVENTORY_CHANGED = Symbol("INVENTORY_CHANGED_EVENT");

export interface InventoryChangeItem extends IEngineEvent {
    owner: string;
    item: string;
    // for removing an item, 0 is all of that item
    quantity: number;
}

export interface InventoryChanged extends IEngineEvent {
    owner: string;
    item: string;
    type: string;
    quantity: number;
}