import {Inventory} from '../../../Inventory'
import {Result, SuccessResult} from '../../Result'
import {ConsumeProduct} from './ConsumeProduct'

export class ConsumeProductHandler {
    private inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(command: ConsumeProduct): Result<null> {
        this.inventory.consumeProduct(command.productId, command.quantity)

        return new SuccessResult(null)
    }
}