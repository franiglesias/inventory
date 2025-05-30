import {describe, expect, it} from 'vitest'
import {ProductExamples} from './ProductExamples'
import {InvalidProductQuantity} from './InvalidProductQuantity'

describe('Product', () => {
    it('should be able to consume units of product', () => {
        const product = ProductExamples.existingProduct()
        const updated = product.consume(10)
        expect(updated.isExhausted()).toBe(true)
    })

    it('should not allow to consume negative quantities', () => {
        const product = ProductExamples.existingProduct()
        expect(() => product.consume(-5)).toThrow(InvalidProductQuantity)
    })

    it('should not allow to consume zero quantities', () => {
        const product = ProductExamples.existingProduct()
        expect(() => product.consume(0)).toThrow(InvalidProductQuantity)
    })

    it('should not allow to consume more than current stock', () => {
        const product = ProductExamples.existingProduct()
        expect(() => product.consume(20)).toThrow(InvalidProductQuantity)
    })
})