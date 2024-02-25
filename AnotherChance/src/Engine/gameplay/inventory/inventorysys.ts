import { EngineBus, IEngineEvent, createEngineEvent } from "../../engine";
import { GameplaySystem } from "../gameplaysys";
import { Inventory } from "./inventory";
import { INVENTORY_ADD_ITEM, INVENTORY_CHANGED, INVENTORY_REMOVE_ITEM, InventoryChangeItem } from "./model/events";

export class InventorySystem extends GameplaySystem {

    inventories: Map<string, Inventory>;

    constructor() {
        super();
        this.inventories = new Map<string, Inventory>();

        EngineBus.on(INVENTORY_ADD_ITEM, this.queue.bind(this));
        EngineBus.on(INVENTORY_REMOVE_ITEM, this.queue.bind(this));
    }

    addInventoryItem(owner: string, item: string, hidden?: boolean, quantity?: number) {
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

        const inv = this.inventories.get(owner)!;
        inv.addItem(item, Math.abs(quantity));
        inv.hideItem(item, hidden ?? false);
        EngineBus.emit(INVENTORY_CHANGED, createEngineEvent(INVENTORY_CHANGED, {owner, item, type: "ADD", hidden: hidden ?? false, quantity}))
    }

    removeInventoryItem(owner: string, item: string, quantity?: number) {
        if (!this.inventories.has(owner)) {
            return;
        }

        if (!item) {
            return;
        }

        quantity = Math.abs(quantity ?? 0);
        const inv = this.inventories.get(owner)!;
        const hidden = inv.getItem(item)?.hidden ?? false;
        inv.removeItem(item, quantity);
        EngineBus.emit(INVENTORY_CHANGED, createEngineEvent(INVENTORY_CHANGED, {owner, item, type: "REMOVE", hidden, quantity}));
    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === INVENTORY_ADD_ITEM) {
            const addEvent = engineEvent as InventoryChangeItem;
            this.addInventoryItem(addEvent.owner, addEvent.item, addEvent.hidden, addEvent.quantity);
        }
        else if (engineEvent.event === INVENTORY_REMOVE_ITEM) {
            const removeEvent = engineEvent as InventoryChangeItem;
            this.removeInventoryItem(removeEvent.owner, removeEvent.item, removeEvent.quantity);
        }
    }
    
}