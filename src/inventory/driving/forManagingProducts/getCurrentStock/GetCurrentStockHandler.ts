import {GetCurrentStock} from './GetCurrentStock'
import {Inventory} from '../../../Inventory'
import {FailedResult, Result, SuccessResult} from '../../Result'

export class GetCurrentStockHandler {
    private readonly inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(query: GetCurrentStock): Result<object> {
        try {
            const productStock = this.inventory.stockById(query.productId)
            return new SuccessResult<object>(productStock.print())
        } catch (e: unknown) {
            return new FailedResult(e as Error)
        }
    }
}