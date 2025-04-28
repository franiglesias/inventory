export class GetCurrentStockResponse {
    private result: unknown
    private errorMessage: string | undefined

    static withError(message: string) {
        return new GetCurrentStockResponse(undefined, message)
    }

    constructor(result: unknown, errorMessage: string) {
        this.result = result
        this.errorMessage = errorMessage
    }

    success() {
        return !this.errorMessage
    }

    error(): string {
        if (!this.errorMessage) {
            throw new Error('Response was successful')
        }
        return this.errorMessage
    }
}