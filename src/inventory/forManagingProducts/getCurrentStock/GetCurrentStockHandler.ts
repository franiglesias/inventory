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
        try {
            const product = this.obtainProductStockInfo(query.productId)

            if (product.stock == 0) {
                return GetCurrentStockResponse.withError(`Product Id ${product.id} exhausted`)
            }

            return GetCurrentStockResponse.withResult(product)
        } catch (e: unknown) {
            return GetCurrentStockResponse.withError((e as Error).message)
        }
    }

    private obtainProductStockInfo(rawProductId: string): ProductStock {
        const productId = ProductId.ensureValid(rawProductId)
        const product = this.getProductById(productId) as ProductStock | undefined
        if (!product) {
            throw new Error(`Product Id ${rawProductId} doesn't exist`)
        }
        return product
    }

    private getProductById(productId: ProductId) {
        return this.productRepository.getProductById(productId)
    }
}