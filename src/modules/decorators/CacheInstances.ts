import { Decorable } from '../../common/lang/Decorable'
import { InstanceStore } from '../classes/InstanceStore'

export const CacheInstances = (paramCount = Infinity, limit = Infinity) => {
    return <T extends Decorable<{}>>(Input: T) => {
        const memory = new InstanceStore<Output>(limit)

        class Output extends Input {
            constructor(...args: any[]) {
                const cachedParameters = args.slice(0, paramCount)

                const inMemory = memory.get(cachedParameters)

                if (inMemory) return inMemory
                else {
                    super(...args)
                    memory.add(cachedParameters, this)
                }
            }
        }

        return Output
    }
}
