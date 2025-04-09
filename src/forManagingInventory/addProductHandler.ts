import {AddProductCommand} from "./addProductCommand";
import {Inventory} from "../domain/inventory";

export class AddProductHandler {
    private inventory: Inventory;

    constructor(inventory: Inventory) {
        this.inventory = inventory;
    }

    handle(command: AddProductCommand) {
        this.inventory.update(command.product, command.quantity)
    }
}