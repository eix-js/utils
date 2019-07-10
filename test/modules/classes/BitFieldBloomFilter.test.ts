import { expect } from 'chai'
import { BitFieldBloomFilter } from '../../../src'

describe('The BitFieldBloomFilter instance', () => {
    it('should work with a simple hash function', () => {
        const instance = new BitFieldBloomFilter<bigint>(data => data)

        instance.add(1n, 7n)

        expect(instance.test(1n)).to.be.true
        expect(instance.test(7n)).to.be.true
        expect(instance.test(3n)).to.be.false
        expect(instance.test(5n)).to.be.false
    })
    it('should work with more then one hash function', () => {
        const instance = new BitFieldBloomFilter<string>(
            data => BigInt(data.charCodeAt(0)),
            data => BigInt(data.charCodeAt(data.length - 1))
        )

        instance.add('Adriel')
        instance.add('Rafael')
        instance.add('Matei')

        expect(instance.test('Adriel')).to.be.true
        expect(instance.test('Rafael')).to.be.true
        expect(instance.test('Matei')).to.be.true
        expect(instance.test('Al')).to.be.true
        expect(instance.test('Adrie')).to.be.false
        expect(instance.test('driel')).to.be.false
        expect(instance.test('Ml')).to.be.true
    })
})
