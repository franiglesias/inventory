import {describe, expect, it} from 'vitest'
import {InvalidIdentifierError, ProductId} from './ProductId'

describe ('ProductId', () => {
    it(`should not be created empty`, () => {
        expect(() => {ProductId.ensureValid('')}).toThrowError(InvalidIdentifierError)
    })
})