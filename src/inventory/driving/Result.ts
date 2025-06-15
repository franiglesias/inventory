export interface Result<T> {
    successful(): boolean

    failure(): boolean

    unwrap(): T

    error(): Error
}

export class SuccessResult<T> implements Result<T> {
    private readonly result: T

    constructor(result: T) {
        this.result = result
    }

    failure(): boolean {
        return false
    }

    successful(): boolean {
        return true
    }

    error(): Error {
        throw new Error('This result has been successful')
    }

    unwrap(): T {
        return this.result
    }
}

export class FailedResult<T> implements Result<T> {
    private readonly fail: Error


    constructor(fail: Error) {
        this.fail = fail
    }

    failure(): boolean {
        return true
    }

    successful(): boolean {
        return false
    }

    unwrap(): T {
        throw new Error(`This result has an error. ${this.fail.message}`, {cause: this.fail})
    }

    error(): Error {
        return this.fail
    }

}