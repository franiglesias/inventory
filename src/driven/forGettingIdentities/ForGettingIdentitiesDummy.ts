import {ForGettingIdentities} from '../../inventory/driven/forGettingIdentities/ForGettingIdentities'

export class ForGettingIdentitiesDummy implements ForGettingIdentities {
    generate(): string {
        throw new Error('Should not be called in this test.')
    }
}