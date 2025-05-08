import {GetCurrentStock} from './GetCurrentStock'
import {Inventory} from '../../../Inventory'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'
import {UnknownProduct} from '../../../UnknownProduct'

export class GetCurrentStockHandler {
    private readonly inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    handle(query: GetCurrentStock): GetCurrentStockResponse {
        try {
            const productStock = this.inventory.stockById(query.productId)

            if (productStock.isExhausted()) {
                return GetCurrentStockResponse.withError(`Product Id ${query.productId} exhausted`)
            }

            return GetCurrentStockResponse.withResult(productStock.print())
        } catch (e: unknown) {
            if (e instanceof UnknownProduct) {
                return GetCurrentStockResponse.withError((e as UnknownProduct).message)
            }
            return GetCurrentStockResponse.withError((e as Error).message)
        }
    }
}