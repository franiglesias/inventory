import {ForGettingIdentities} from '../../inventory/driven/forGettingIdentities/ForGettingIdentities'

export class IdentityProvider implements ForGettingIdentities {
    generate() {
        return 'new-product-id'
    }
}