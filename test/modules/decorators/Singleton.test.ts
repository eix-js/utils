import { Singleton } from '../../../src'
import { expect } from 'chai'

describe('Singleton', () => {
    it('should serve the same objecct when create multiple times', () => {
        //create class
        @Singleton
        class TestClass {}

        //create 2 instances
        const a = new TestClass()
        const b = new TestClass()

        //should be the same
        expect(a, 'Both objects should be the exact same instance').to.be.equal(
            b
        )
    })
})
