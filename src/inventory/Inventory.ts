import {ForStoringProducts} from './driven/forStoringProducts/ForStoringProducts'
import {ProductId} from './ProductId'
import {UnknownProduct} from './UnknownProduct'
import {ForGettingIdentities} from './driven/forGettingIdentities/ForGettingIdentities'
import {Product} from './Product'
import {ExhaustedProduct} from './ExhaustedProduct'
import {ProductRepresentation} from './ProductRepresentation'
import {ProductStockRepresentation} from './ProductStockRepresentation'
import {ProductWithSameNameAlreadyExists} from './ProductWithSameNameAlreadyExists'

export class Inventory {
    private readonly storage: ForStoringProducts
    private readonly identityProvider: ForGettingIdentities

    constructor(storage: ForStoringProducts, identityProvider: ForGettingIdentities) {
        this.storage = storage
        this.identityProvider = identityProvider
    }

    stockById(productId: string): ProductRepresentation<any> {
        const pId = ProductId.validatedFrom(productId)

        const product: Product | undefined = this.storage.getById(productId.toString())
        if (!product) {
            throw new UnknownProduct(productId)
        }

        if (product.isExhausted()) {
            throw new ExhaustedProduct(productId)
        }

        return product.representAs(new ProductStockRepresentation())
    }

    registerProduct(productName: string, initialQuantity: number): string {
        if (this.storage.hasProductWithName(productName)) {
            throw new ProductWithSameNameAlreadyExists(productName)
        }
        const newProductId = this.identityProvider.generate()
        const productToAdd = Product.register(newProductId, productName, initialQuantity)

        this.storage.store(newProductId, productToAdd)

        return newProductId
    }

    restockProduct(productId: string, quantity: number): void {
        const product = this.storage.getById(productId)
        if (!product) {
            throw new UnknownProduct(productId)
        }

        const updatedProduct = product.restock(quantity)

        this.storage.store(productId, updatedProduct)
    }

    consumeProduct(productId: string, quantity: number): void {
        const product = this.storage.getById(productId)

        const updatedProduct = product!.consume(quantity)

        this.storage.store(productId, updatedProduct)
    }
}