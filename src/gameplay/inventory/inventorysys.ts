import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent } from "../../engine";
import { Inventory } from "./inventory";
import { INVENTORY_ADD_ITEM, INVENTORY_CHANGED, INVENTORY_REMOVE_ITEM, InventoryChangeItem } from "./model/events";

export class InventorySystem implements EngineSystem {

    inventories: Map<string, Inventory>;

    constructor() {
        this.inventories = new Map<string, Inventory>();

        EngineBus.on(INVENTORY_ADD_ITEM, this.queue);
        EngineBus.on(INVENTORY_REMOVE_ITEM, this.queue);
    }

    addInventoryItem(owner: string, item: string, quantity: number) {
        if (!this.inventories.has(owner)) {
            this.inventories.set(owner, new Inventory(owner));
        }

        if (!item) {
            return;
        }

        if (!quantity) {
            return;
        }

        quantity = Math.abs(quantity);

        this.inventories.get(owner)!.addItem(item, Math.abs(quantity));
        EngineBus.emit(INVENTORY_CHANGED, createEngineEvent(INVENTORY_CHANGED, {owner, item, type: "ADD", quantity}))
    }

    removeInventoryItem(owner: string, item: string, quantity: number) {
        if (!this.inventories.has(owner)) {
            return;
        }

        if (!item) {
            return;
        }

        quantity = Math.abs(quantity);
        this.inventories.get(owner)!.removeItem(item, Math.abs(quantity));
        EngineBus.emit(INVENTORY_CHANGED, createEngineEvent(INVENTORY_CHANGED, {owner, item, type: "REMOVE", quantity}));
    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === INVENTORY_ADD_ITEM) {
            const addEvent = engineEvent as InventoryChangeItem;
            this.addInventoryItem(addEvent.owner, addEvent.item, addEvent.quantity);
        }
        else if (engineEvent.event === INVENTORY_REMOVE_ITEM) {
            const removeEvent = engineEvent as InventoryChangeItem;
            this.removeInventoryItem(removeEvent.owner, removeEvent.item, removeEvent.quantity);
        }
    }
    
    update(time: number): void {
        throw new Error("Method not implemented.");
    }
    
}