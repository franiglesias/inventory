import {AddProduct} from './AddProduct'
import {Inventory} from '../../../Inventory'
import {InvalidProductName} from '../../../InvalidProductName'
import {InvalidProductQuantity} from '../../../InvalidProductQuantity'
import {FailedResult, Result, SuccessResult} from '../../Result'

export class AddProductHandler {
    private inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(command: AddProduct): Result<string> {
        try {
            this.assertValid(command)
            const newProductId = this.inventory.registerProduct(command.productName, command.initialQuantity)
            return new SuccessResult<string>(newProductId)
        } catch (err: unknown) {
            return new FailedResult(err as Error)
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