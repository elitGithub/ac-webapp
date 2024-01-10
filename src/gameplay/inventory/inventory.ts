export interface InventoryItem {
    item: string;
    quantity: number;
    hidden?: boolean;
}

export class Inventory {
    owner: string;
    inventoryItems: Map<string, InventoryItem>;

    constructor(owner: string) {
        this.owner = owner;
        this.inventoryItems = new Map<string, InventoryItem>();
    }

    getAll(includeHidden: boolean = false) {
        if (!includeHidden) {
            return Array.from(this.inventoryItems.values()).filter(item => !item.hidden);
        }

        return Array.from(this.inventoryItems.values());
    }

    getItem(item: string) {
        return this.inventoryItems.get(item);
    }

    getItemQuantity(item: string) {
        return this.inventoryItems.get(item)?.quantity ?? 0;
    }

    addItem(item: string, quantity: number) {
        if (this.inventoryItems.has(item)) {
            this.inventoryItems.get(item)!.quantity += quantity;
        }
        else {
            this.inventoryItems.set(item, {item, quantity});
        }
    }

    removeItem(item: string, quantity: number) {
        if (!this.inventoryItems.has(item)) {
            return;
        }

        if (quantity === 0) {
            this.inventoryItems.delete(item);
            return;
        }

        if (this.inventoryItems.get(item)!.quantity - quantity <= 0) {
            this.inventoryItems.delete(item);
        }
        else {
            this.inventoryItems.get(item)!.quantity -= quantity;
        }
    }

    hideItem(item: string, hidden: boolean) {
        const invItem = this.inventoryItems.get(item);
        if (invItem) {
             invItem.hidden = hidden;
        }
    }
}