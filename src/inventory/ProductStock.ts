import {ProductId} from './product/ProductId'

export class ProductStock {
    private readonly id: ProductId
    private readonly name: string
    private readonly stock: number

    constructor(id: ProductId, name: string, stock: number) {
        this.id = id
        this.name = name
        this.stock = stock
    }

    isExhausted(): boolean {
        return this.stock <= 0
    }

    print(): Object {
        return {
            id: this.id.toString(),
            name: this.name,
            stock: this.stock
        }
    }
}