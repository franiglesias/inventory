import {ForGettingIdentities} from "../../inventory/driven/forGettingIdentities/ForGettingIdentities";
import ShortUniqueId from 'short-unique-id'

export class ShortUniqueIdProvider implements ForGettingIdentities {
    generate(): string {
        const generator = new ShortUniqueId({length: 8})
        return generator.rnd()
    }
}