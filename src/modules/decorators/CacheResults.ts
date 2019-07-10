import { InstanceStore } from '../classes/InstanceStore'

export const CacheResults = <T>(paramCount = Infinity, limit = Infinity) => {
    const memory = new InstanceStore<T>(limit)

    return (target: unknown, key: unknown, descriptior: PropertyDescriptor) => {
        const method: (...args: unknown[]) => T = descriptior.value

        // i can't use an arrow function because i want to acces this
        descriptior.value = function(...args: unknown[]) {
            const cachedParameters = args.slice(0, paramCount)
            const inMemory = memory.get(cachedParameters)

            if (inMemory) {
                return inMemory
            } else {
                const result = method.apply(this, args)

                memory.add(cachedParameters, result)

                return result
            }
        }
    }
}
