import {AddProduct} from './AddProduct'
import {AddProductResponse} from './AddProductResponse'
import {Inventory} from '../../../Inventory'
import {InvalidProductName} from '../../../InvalidProductName'

export class AddProductHandler {
    private inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(command: AddProduct) {
        if (command.productName.length < 1) {
            return AddProductResponse.failure(new InvalidProductName(command.productName))
        }
        const newProductId = this.inventory.registerProduct(command.productName, command.initialQuantity)
        return AddProductResponse.success(newProductId)
    }
}