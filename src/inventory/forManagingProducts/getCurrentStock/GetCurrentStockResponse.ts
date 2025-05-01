export class GetCurrentStockResponse {
    private readonly result: Object
    private readonly errorMessage: string | undefined

    static withError(message: string) {
        return new GetCurrentStockResponse({}, message)
    }

    static withResult(result: Object): GetCurrentStockResponse {
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
        if (this.success()) {
            throw new Error('Response was successful')
        }
        return this.errorMessage!
    }

    payload(): Object {
        return this.result
    }
}