import {ForGettingIdentities} from "../../inventory/driven/forGettingIdentities/ForGettingIdentities";
import ShortUniqueId from 'short-unique-id'

export class SequentialIdProvider implements ForGettingIdentities {
    private counter: number = 0
    generate(): string {
        this.counter ++
        return this.counter.toString()
    }
}