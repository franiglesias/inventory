import {Inventory} from '../../../Inventory'
import {RestockProduct} from './RestockProduct'
import {FailedResult, Result, SuccessResult} from '../../Result'
import {InvalidProductId} from '../../../InvalidProductId'
import {InvalidProductQuantity} from '../../../InvalidProductQuantity'

export class RestockProductHandler {
    private inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(command: RestockProduct): Result<null> {
        try {
            this.asssertCommand(command)
            this.inventory.restockProduct(command.productId, command.quantity)
            return new SuccessResult(null)
        } catch (err: unknown) {
            return new FailedResult(err as Error)
        }
    }

    private asssertCommand(command: RestockProduct) {
        if (typeof command.productId != 'string') {
            throw new InvalidProductId(command.productId)
        }

        if (typeof command.quantity != 'number') {
            throw new InvalidProductQuantity(command.quantity)
        }
    }
}