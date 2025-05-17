import {AddProduct} from './AddProduct'
import {AddProductResponse} from './AddProductResponse'
import {Inventory} from '../../../Inventory'

export class AddProductHandler {
    private inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(command: AddProduct) {
        const newProductId = this.inventory.registerProduct(command.productName, command.initialQuantity)
        return new AddProductResponse(newProductId)
    }
}