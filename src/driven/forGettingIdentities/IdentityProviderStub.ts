import {ForGettingIdentities} from '../../inventory/driven/forGettingIdentities/ForGettingIdentities'

export class IdentityProviderStub implements ForGettingIdentities {
    generate() {
        return 'new-product-id'
    }
}