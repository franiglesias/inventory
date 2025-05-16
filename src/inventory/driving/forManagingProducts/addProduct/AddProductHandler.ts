import {AddProduct} from './AddProduct'
import {AddProductResponse} from './AddProductResponse'

export class AddProductHandler {
    handle(command: AddProduct) {
        return new AddProductResponse('new-product-id')
    }
}