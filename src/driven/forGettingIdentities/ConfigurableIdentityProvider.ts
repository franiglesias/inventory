import {ForGettingIdentities} from '../../inventory/driven/forGettingIdentities/ForGettingIdentities'

export class ConfigurableIdentityProvider implements ForGettingIdentities {
    private identities: string[] = []

    constructor(...identities: string[]) {
        this.identities = identities
    }

    generate(): string {
        if (this.identities.length < 1) {
            throw new Error('No identities available to generate')
        }
        return this.identities.shift() || 'Invalid identity'
    }
}