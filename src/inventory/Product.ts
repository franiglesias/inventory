import {InvalidProductName} from './InvalidProductName'
import {InvalidProductQuantity} from './InvalidProductQuantity'

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
}