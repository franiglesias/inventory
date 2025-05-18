import {AddProduct} from './AddProduct'
import {AddProductResponse} from './AddProductResponse'
import {Inventory} from '../../../Inventory'
import {InvalidProductName} from '../../../InvalidProductName'
import {InvalidProductQuantity} from '../../../InvalidProductQuantity'

export class AddProductHandler {
    private inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(command: AddProduct):AddProductResponse {
        try {
            this.assertValid(command)
            const newProductId = this.inventory.registerProduct(command.productName, command.initialQuantity)
            return AddProductResponse.success(newProductId)
        } catch (err: unknown) {
            return AddProductResponse.failure(err as Error)
        }
    }

    private assertValid(command: AddProduct) {
        if (typeof command.productName != 'string') {
            throw new InvalidProductName(command.productName)
        }
        if (typeof command.initialQuantity != 'number') {
            throw new InvalidProductQuantity(command.initialQuantity)
        }
    }
}