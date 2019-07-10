import { expect } from 'chai'
import { InstanceStore } from '../../../src'

describe('The InstanceStore instance', () => {
    let store: InstanceStore<number>

    beforeEach(() => {
        store = new InstanceStore()
    })

    it('should store and return instances', () => {
        store.add([1, 2, 3], 7)

        expect(store.get([1, 2, 3])).to.equal(7)
    })

    it('should not return the instance if the parameters are different', () => {
        store.add([1, 2, 3], 7)

        expect(store.get([1, 3, 2])).to.not.equal(7)
    })

    it('should return the right instance when add entries', () => {
        store.add([1, 2, 3], 7)
        store.add([3, 2, 1], 8)

        expect(store.get([1, 2, 3])).to.equal(7)
        expect(store.get([3, 2, 1])).to.equal(8)
    })
})
