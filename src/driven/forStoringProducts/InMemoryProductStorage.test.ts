import {describe, expect, it} from 'vitest'
import {InMemoryProductStorage} from './InMemoryProductStorage'
import {Product} from '../../inventory/Product'
import {ProductExamples} from '../../inventory/ProductExamples'

describe('InMemoryProductStorage', () => {
    it('should return undefined if object doesn\'t exist', () => {
        const storage = new InMemoryProductStorage(new Map<string, Product>())
        expect(storage.getById('ramdom-product-id')).toBeUndefined()
    })

    it('should return objects stored', () => {
        const examples = new Map<string, Product>([
            ['pr-0001', ProductExamples.existingProduct()],
        ])
        const storage = new InMemoryProductStorage(examples)
        expect(storage.getById('pr-0001')).toEqual(
            ProductExamples.existingProduct()
        )
    })
})