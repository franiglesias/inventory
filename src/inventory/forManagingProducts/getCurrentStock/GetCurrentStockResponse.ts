export class GetCurrentStockResponse {
    private result: Object
    private errorMessage: string | undefined

    static withError(message: string) {
        return new GetCurrentStockResponse({}, message)
    }

    static withSuccess(result: Object): GetCurrentStockResponse {
        return new GetCurrentStockResponse(result)
    }

    constructor(result: Object, errorMessage?: string) {
        this.result = result
        this.errorMessage = errorMessage
    }

    success() {
        return !this.errorMessage || this.errorMessage.length === 0
    }

    error(): string {
        if (!this.errorMessage) {
            throw new Error('Response was successful')
        }
        return this.errorMessage
    }

    payload(): Object {
        return this.result
    }
}