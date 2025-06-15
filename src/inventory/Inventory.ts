import {ForStoringProducts} from './driven/forStoringProducts/ForStoringProducts'
import {UnknownProduct} from './UnknownProduct'
import {Product} from './Product'
import {ExhaustedProduct} from './ExhaustedProduct'
import {ProductRepresentation} from './ProductRepresentation'
import {ProductStockRepresentation} from './ProductStockRepresentation'
import {ProductWithSameNameAlreadyExists} from './ProductWithSameNameAlreadyExists'
import {ProductIdentity} from './ProductIdentity'
import {InvalidProductId} from './InvalidProductId'

export class Inventory {
    private readonly storage: ForStoringProducts
    private identity: ProductIdentity

    constructor(storage: ForStoringProducts, identity: ProductIdentity) {
        this.storage = storage
        this.identity = identity
    }

    stockById(productId: string): ProductRepresentation<any> {
        if (productId.length === 0) {
            throw new InvalidProductId(productId)
        }

        const product: Product | undefined = this.storage.getById(productId)
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
        const newProductId = this.identity.generateFor(productName)
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