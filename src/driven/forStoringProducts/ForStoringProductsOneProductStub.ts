import {ForStoringProducts} from '../../inventory/driven/forStoringProducts/ForStoringProducts'
import {Product} from '../../inventory/Product'

export class ForStoringProductsOneProductStub implements ForStoringProducts {
    private readonly productToReturn?: Product

    constructor(shouldReturn?: Product) {
        this.productToReturn = shouldReturn
    }

    getById(productId: string): Product | undefined {
        return this.productToReturn
    }

    store(productId: string, product: Product): void {
        throw new Error('Should not be called in this test.')
    }
}