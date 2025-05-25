import {describe, it, expect} from 'vitest'
import {ConfigurableIdentityProvider} from './ConfigurableIdentityProvider'

describe('ConfigurableIdentityProvider', () => {
    it('should return one configured identity', () => {
        const provider = new ConfigurableIdentityProvider('first-identity')
        expect(provider.generate()).toEqual('first-identity')
    })

    it('should return several configured identities', () => {
        const provider = new ConfigurableIdentityProvider('first-identity', 'second-identity', 'third-identity')
        expect(provider.generate()).toEqual('first-identity')
        expect(provider.generate()).toEqual('second-identity')
        expect(provider.generate()).toEqual('third-identity')
    })

    it('should fail when no more identities available', () => {
        const provider = new ConfigurableIdentityProvider('first-identity')
        expect(provider.generate()).toEqual('first-identity')
        expect(() => {provider.generate()}).toThrow(Error)
    })
})