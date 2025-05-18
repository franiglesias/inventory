import {GetCurrentStock} from './GetCurrentStock'
import {Inventory} from '../../../Inventory'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'

export class GetCurrentStockHandler {
    private readonly inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(query: GetCurrentStock): GetCurrentStockResponse {
        try {
            const productStock = this.inventory.stockById(query.productId)
            return GetCurrentStockResponse.withResult(productStock.print())
        } catch (e: unknown) {
            return GetCurrentStockResponse.withError((e as Error).message)
        }
    }
}