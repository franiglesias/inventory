export class AddProductResponse {
    private readonly result:string

    constructor(result: string) {
        this.result = result
    }

    unwrap(): string {
        return this.result
    }
}