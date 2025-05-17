export class GetCurrentStockResponse {
    private readonly productStock: {} | null
    private readonly error: string | null

    constructor(productStock: {} | null, error: string | null) {
        this.productStock = productStock
        this.error = error
    }

    static withError(message: string) {
        return new GetCurrentStockResponse(null, message)
    }

    static withResult(result: {}) {
        return new GetCurrentStockResponse(result, null)
    }

    unwrap() {
        if (this.error && !this.productStock) {
           throw new Error(this.error)
        }
        return this.productStock
    }

    errorMessage(): string {
        return this.error!
    }
}