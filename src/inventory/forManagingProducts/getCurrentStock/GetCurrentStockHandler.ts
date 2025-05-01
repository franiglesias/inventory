import {GetCurrentStock} from './GetCurrentStock'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'
import {InMemoryProducts} from '../../../driven/forRetrievingProducts/InMemoryProducts'
import {Inventory} from '../../Inventory'

export class GetCurrentStockHandler {
    private inventory: Inventory

    constructor() {
        this.inventory = new Inventory(new InMemoryProducts())
    }

    handle(query: GetCurrentStock): GetCurrentStockResponse {
        try {
            const product = this.inventory.obtainProductStockInfo(query.productId)

            if (product.isExhausted()) {
                return GetCurrentStockResponse.withError(`Product Id ${query.productId} exhausted`)
            }

            return GetCurrentStockResponse.withResult(product.print())
        } catch (e: unknown) {
            return GetCurrentStockResponse.withError((e as Error).message)
        }
    }
}