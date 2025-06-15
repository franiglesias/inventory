import {describe, expect, it} from 'vitest'
import {SequentialIdProvider} from './SequentialIdProvider'


describe('SequentialIdProvider', () => {
    const generator = new SequentialIdProvider();

    describe('Identifier', () => {
        it('should generate a sequence', () => {
            expect(generator.generate()).toEqual('1');
            expect(generator.generate()).toEqual('2');
            expect(generator.generate()).toEqual('3');
            expect(generator.generate()).toEqual('4');
            expect(generator.generate()).toEqual('5');
            expect(generator.generate()).toEqual('6');
        });
    })
})