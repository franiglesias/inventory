import {ProductStock} from './ProductStock'
import {ForStoringProducts} from './driven/forStoringProducts/ForStoringProducts'
import {ProductId} from './ProductId'
import { UnknownProduct } from './UnknownProduct'
import {IdentityProvider} from './IdentityProvider'

export class Inventory {
    private readonly storage: ForStoringProducts
    private readonly identityProvider: IdentityProvider

    constructor(storage: ForStoringProducts) {
        this.storage = storage
        this.identityProvider = new IdentityProvider()
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

    registerProduct(productName: string, initialQuantity: number): string {
        const newProductId = this.identityProvider.generate()

        this.storage.store(newProductId, {id: newProductId, name: productName, quantity: initialQuantity})

        return newProductId
    }
}