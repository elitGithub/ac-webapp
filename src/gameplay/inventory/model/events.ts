import { IEngineEvent } from "../../../engine";

export const INVENTORY_ADD_ITEM = Symbol("INVENTORY_ADD_ITEM_EVENT");
export const INVENTORY_REMOVE_ITEM = Symbol("INVENTORY_REMOVE_ITEM_EVENT");

export const INVENTORY_CHANGED = Symbol("INVENTORY_CHANGED_EVENT");

export interface InventoryChangeItem extends IEngineEvent {
    owner: string;
    item: string;
    // When creating an item, determines if it is hidden. Can also be used to toggle an item's visibility.
    hidden?: boolean;
    // Determines the amount to add or remove of the item. When removing an item, a quantity of 0 removes all of the item.
    quantity?: number;
}

export interface InventoryChanged extends IEngineEvent {
    owner: string;
    item: string;
    type: string;
    hidden: boolean;
    quantity: number;
}