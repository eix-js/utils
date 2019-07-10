import { expect } from 'chai'
import { compareArrays } from '../../../src'

describe('The compareArrays function', () => {
    it('should return true if 2 arrays contain the same stuff', () => {
        const obj = {
            foo: 'bar'
        }

        const first = [1, 'somestring', obj]
        const second = [Number('1'), 'some' + 'string', obj]

        expect(compareArrays(first, second)).to.be.true
    })

    it('shouldnt return true if 2 arrays contain different stuff', () => {
        const obj = {
            foo: 'bar'
        }

        const first = [1, obj]
        const second = [1, { ...obj }]

        expect(compareArrays(first, second)).to.be.false
    })
})
