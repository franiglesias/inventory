import {Inventory} from "../domain/inventory";
import {RemoveProductCommand} from "./removeProductCommand";

export class RemoveProductHandler {
    private inventory: Inventory;

    constructor(inventory: Inventory) {
        this.inventory = inventory;
    }

    handler(command: RemoveProductCommand) {
        this.inventory.remove(command.productName, command.quantity)
    }
}