import {InvalidProductName} from './InvalidProductName'
import {InvalidProductQuantity} from './InvalidProductQuantity'
import {ProductRepresentation} from './ProductRepresentation'

export class Product {

    private readonly id: string
    private readonly name: string
    private readonly stock: number

    private constructor(id: string, name: string, stock: number) {
        this.id = id
        this.name = name
        this.stock = stock
    }

    static register(newProductId: string, productName: string, initialQuantity: number): Product {
        if (productName.length === 0) {
            throw new InvalidProductName(
                productName,
            )
        }

        if (initialQuantity < 1) {
            throw new InvalidProductQuantity(initialQuantity)
        }

        return new Product(newProductId, productName, initialQuantity)
    }

    static rebuild(productId: string, productName: string, stock: number) {
        return new Product(productId, productName, stock)
    }

    isExhausted(): boolean {
        return this.stock === 0
    }

    isCalled(productName: string): boolean {
        return this.name.toLowerCase() == productName.toLowerCase()
    }

    representAs(representation: ProductRepresentation<any>): ProductRepresentation<any> {
        representation.fill('id', this.id)
        representation.fill('name', this.name)
        representation.fill('stock', this.stock)

        return representation
    }

    restock(quantity: number): Product {
        return new Product(this.id, this.name, this.stock + quantity)
    }
}