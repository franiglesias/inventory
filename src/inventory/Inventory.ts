import {ProductStock} from './ProductStock'
import {ForStoringProducts} from './driven/forStoringProducts/ForStoringProducts'
import {ProductId} from './ProductId'
import {UnknownProduct} from './UnknownProduct'
import {ForGettingIdentities} from './driven/forGettingIdentities/ForGettingIdentities'
import {InvalidProductName} from './InvalidProductName'

export class Inventory {
    private readonly storage: ForStoringProducts
    private readonly identityProvider: ForGettingIdentities

    constructor(storage: ForStoringProducts, identityProvider: ForGettingIdentities) {
        this.storage = storage
        this.identityProvider = identityProvider
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
        if (productName.length === 0) {
            throw new InvalidProductName(
                productName,
            )
        }
        const newProductId = this.identityProvider.generate()

        this.storage.store(newProductId, {id: newProductId, name: productName, stock: initialQuantity})

        return newProductId
    }
}