import {describe, expect, it} from 'vitest'
import {ConfigurableIdentityProvider} from '../driven/forGettingIdentities/ConfigurableIdentityProvider'
import {ProductIdentity} from './ProductIdentity'

describe('ProductIdentity', () => {
    it('Should generate id in the required format', () => {
        const generator = new ConfigurableIdentityProvider(
            '3'
        )
        const identity = new ProductIdentity(generator)
        expect(identity.generateFor('New Product')).toEqual('new-00003')
    })
})