import {describe, expect, it} from 'vitest'
import {InMemoryProductStorage} from './InMemoryProductStorage'

describe('InMemoryProductStorage', () => {
    it('should return undefined if object doesn\'t exist', () => {
        const storage = new InMemoryProductStorage(new Map<string, Object>())
        expect(storage.getById('ramdom-product-id')).toBeUndefined()
    })

    it('should return objects stored', () => {
        const examples = new Map<string, Object>([
            ['pr-0001', {id: 'pr-0001', name: 'First product', stock: 100}],
        ])
        const storage = new InMemoryProductStorage(examples)
        expect(storage.getById('pr-0001')).toEqual(
            {id: 'pr-0001', name: 'First product', stock: 100}
        )
    })
})