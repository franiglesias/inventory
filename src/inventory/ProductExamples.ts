import {Product} from './Product'

export class ProductExamples {
    static existingProduct(): Product {
        return Product.rebuild(
            'existing-product-id',
            'existing-product-name',
            10
        )
    }

    static exhaustedProduct(): Product {
        return Product.rebuild(
            'exhausted-product-id',
            'exhausted-product-name',
            0
        )
    }
}