import {ForRetrievingProducts} from './forRetrievingProducts/ForRetrievingProducts'
import {ProductStock} from './ProductStock'
import {ProductId} from './product/ProductId'

export class Inventory {
    private repository: ForRetrievingProducts

    constructor(repository: ForRetrievingProducts) {
        this.repository = repository
    }

    public obtainProductStockInfo(rawProductId: string): ProductStock {
        const productId = ProductId.ensureValid(rawProductId)
        const product = this.getProductById(productId) as ProductStock | undefined
        if (!product) {
            throw new Error(`Product Id ${rawProductId} doesn't exist`)
        }
        return product
    }

    private getProductById(productId: ProductId): ProductStock {
        const productData = this.repository.getProductById(productId)
        if (!productData) {
            throw new Error(`Product Id ${productId} doesn't exist`)
        }
        return new ProductStock(productId, productData.name, productData.stock)
    }
}