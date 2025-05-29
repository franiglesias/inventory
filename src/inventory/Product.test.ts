import {describe, expect, it} from 'vitest'
import {Product} from './Product'

describe('Product', () => {
    it('should be able to consume units of product', () => {
        const product = Product.register('product-01', 'Test Product', 10)
        const updated = product.consume(10)
        expect(updated.isExhausted()).toBe(true)
    })
})