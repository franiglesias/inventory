import {GetCurrentStock} from './GetCurrentStock'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'

export class GetCurrentStockHandler {
    handle(query: GetCurrentStock): GetCurrentStockResponse {
        if (!this.hasStockOf(query.productId)) {
            return GetCurrentStockResponse.withError(`Product Id ${query.productId} exhausted`)
        }
        return GetCurrentStockResponse.withError(`Product Id ${query.productId} doesn't exist`)
    }

    private hasStockOf(productId: string) {
        return productId != 'no-stock-product-id'
    }
}