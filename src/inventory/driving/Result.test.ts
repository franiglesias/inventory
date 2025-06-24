import { describe, expect, it } from "vitest";
import {FailedResult, SuccessResult} from './Result'

describe('Result pattern', () => {
    it('should allow different types of result', () => {
        const stringResult = new SuccessResult('Hello world');
        expect(stringResult.unwrap()).toEqual('Hello world');

        const numericResult = new SuccessResult(1234.56);
        expect(numericResult.unwrap()).toEqual(1234.56)
    });

    it('should not allow error if it has result', () => {
        const result = new SuccessResult('Hello world');
        expect(() => {result.error()}).toThrow(Error)
    })

    it('should show success', () => {
        const result = new SuccessResult('Hello world');
        expect(result.successful()).toEqual(true)
    });

    it ('should not allow unwrap if it has error message', () => {
        const result = new FailedResult(new Error('Something wrong'));
        expect(() => {result.unwrap()}).toThrow(Error)
    })

    it ('should show fail', () => {
        const result = new FailedResult(new Error('Something wrong'));
        expect(result.failure()).toEqual(true)
    })

    it ('should provide error message if it contains any', () => {
        const result =  new FailedResult(new Error('Something wrong'));
        expect(result.error().message).toEqual('Something wrong');
    })
})