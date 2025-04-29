import {GetCurrentStock} from './GetCurrentStock'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'
import {ForRetrievingProducts} from '../../forRetrievingProducts/ForRetrievingProducts'
import {InMemoryProducts} from '../../../driven/forRetrievingProducts/InMemoryProducts'
import {ProductId} from '../../product/ProductId'

type ProductStock = {
    id: ProductId
    name: string
    stock: number
}

export class GetCurrentStockHandler {
    private productRepository: ForRetrievingProducts

    constructor() {
        this.productRepository = new InMemoryProducts
    }

    handle(query: GetCurrentStock): GetCurrentStockResponse {
        if (query.productId.length == 0) {
            return GetCurrentStockResponse.withError('Invalid Product Id')
        }
        const productId = new ProductId(query.productId)
        const product = this.getProductById(productId) as ProductStock | undefined
        if (!product) {
            return GetCurrentStockResponse.withError(`Product Id ${query.productId} doesn't exist`)
        }

        if (product.stock == 0) {
            return GetCurrentStockResponse.withError(`Product Id ${query.productId} exhausted`)
        }

        return GetCurrentStockResponse.withResult(product)
    }

    private getProductById(productId: ProductId) {
        return this.productRepository.getProductById(productId)
    }
}