import {ForGettingIdentities} from './driven/forGettingIdentities/ForGettingIdentities'

export class ProductIdentity {
    private generator: ForGettingIdentities

    constructor(generator: ForGettingIdentities) {
        this.generator = generator
    }

    generateFor(productName: string): string {
        const identifier = this.generator.generate()
        return `${productName.substring(0, 3).toLowerCase()}-${identifier.padStart(5, '0')}`
    }
}