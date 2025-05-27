import {Inventory} from '../../../Inventory'
import {RestockProduct} from './RestockProduct'
import {FailedResult, Result, SuccessResult} from '../../Result'

export class RestockProductHandler {
    private inventory: Inventory;

    constructor(inventory: Inventory) {
        this.inventory = inventory;
    }

    handle(command: RestockProduct): Result<null> {
        try {
            this.inventory.restockProduct(command.productId, command.quantity);
            return new SuccessResult(null);
        } catch (err: unknown) {
            return new FailedResult(err as Error);
        }
    }
}