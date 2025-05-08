import {ProductStock} from './ProductStock'
import {ForStoringProducts} from './driven/forStoringProducts/ForStoringProducts'
import {ProductId} from './ProductId'
import { UnknownProduct } from './UnknownProduct'

export class Inventory {
    private readonly storage: ForStoringProducts

    constructor(storage: ForStoringProducts) {
        this.storage = storage
    }

    stockById(productId: string): ProductStock {
        const pId = ProductId.validatedFrom(productId)
        const productData = this.storage.getById(productId.toString())

        if (!productData) {
            throw new UnknownProduct(productId)
        }

        return new ProductStock(
            productData.id,
            productData.name,
            productData.stock,
        )
    }
}