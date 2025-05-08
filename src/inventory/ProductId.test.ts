import {describe, expect, it} from 'vitest'
import {ProductId} from './ProductId'
import {InvalidProductId} from './InvalidProductId'

describe('ProductId', () => {
    it('Should be valid on instantiation', () => {
        expect(() => {ProductId.validatedFrom('')}).toThrowError(InvalidProductId)
    })
})