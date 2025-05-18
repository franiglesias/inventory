import {InvalidProductName} from '../../../InvalidProductName'

export class AddProductResponse {
    private readonly result?:string
    private readonly failure?:Error = new InvalidProductName('')

    constructor(result?: string, error?:Error) {
        this.result = result
        this.failure = error
    }

    static success(result: string): AddProductResponse {
        return new AddProductResponse(result)
    }

    static failure(failure: Error): AddProductResponse {
        return new AddProductResponse(undefined, failure)
    }

    unwrap(): string | undefined{
        if (!this.result) {
            return undefined
        }
        return this.result
    }

    error(): Error | undefined {
        return this.failure
    }
}