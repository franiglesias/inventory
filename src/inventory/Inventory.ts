import {ProductStock} from './ProductStock'
import {ForStoringProducts} from './driven/forStoringProducts/ForStoringProducts'
import {ProductId} from './ProductId'
import {UnknownProduct} from './UnknownProduct'
import {ForGettingIdentities} from './driven/forGettingIdentities/ForGettingIdentities'
import {Product} from './Product'

export class Inventory {
    private readonly storage: ForStoringProducts
    private readonly identityProvider: ForGettingIdentities

    constructor(storage: ForStoringProducts, identityProvider: ForGettingIdentities) {
        this.storage = storage
        this.identityProvider = identityProvider
    }

    stockById(productId: string): ProductStock {
        const pId = ProductId.validatedFrom(productId)
        const productData: Product | undefined = this.storage.getById(productId.toString())

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
        const productToAdd = Product.register(newProductId, productName, initialQuantity)

        this.storage.store(newProductId, productToAdd)

        return newProductId
    }
}