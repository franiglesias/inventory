import {GetProductInventory} from "./getProductInventory";

import {Inventory} from "../domain/inventory";

export class GetProductInventoryHandler {
    private inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory;
    }

    handle(query: GetProductInventory) {
        return this.inventory.inventoryOf(query.product);
    }
}