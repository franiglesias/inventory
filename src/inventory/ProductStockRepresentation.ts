import {ProductRepresentation} from './ProductRepresentation'

import {ProductStock} from './ProductStock'

export class ProductStockRepresentation implements ProductRepresentation<ProductStock> {
    id: string | undefined
    name: string | undefined
    stock: number | undefined

    fill(key: string, value: unknown) {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
            (this as any)[key] = value
        }
    }

    print(): ProductStock {
        return {
            id: this.id,
            name: this.name,
            stock: this.stock
        } as ProductStock
    }
}