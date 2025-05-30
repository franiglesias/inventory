import {Inventory} from '../../../Inventory'
import {FailedResult, Result, SuccessResult} from '../../Result'
import {ConsumeProduct} from './ConsumeProduct'
import {InvalidProductId} from '../../../InvalidProductId'
import {InvalidProductQuantity} from '../../../InvalidProductQuantity'

export class ConsumeProductHandler {
    private inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(command: ConsumeProduct): Result<null> {
        try {
            this.assertCommand(command)
            this.inventory.consumeProduct(command.productId, command.quantity)

            return new SuccessResult(null)
        } catch (e: unknown) {
            return new FailedResult(e as Error)
        }
    }

    private assertCommand(command: ConsumeProduct) {
        if (typeof command.productId != 'string') {
            throw new InvalidProductId(command.productId)
        }

        if (typeof command.quantity != 'number') {
            throw new InvalidProductQuantity(command.quantity)
        }
    }
}