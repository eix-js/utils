import murmurhash3js from 'murmurhash3js'
import { Decorable } from '../../common/lang/Decorable'
import { LruCache } from '../classes/LruCache'

export const CacheInstancesByKey = (limit = Infinity) => {
    return <T extends Decorable<{}>>(Input: T) => {
        const cache = new LruCache<Output>(limit)
        const encode = (data: string) => murmurhash3js.x86.hash32(data)

        class Output extends Input {
            constructor(...args: any[]) {
                const key = args[0] as string

                const hash = encode(key)
                const instance = cache.get(hash)

                if (instance) return instance
                else {
                    super(...args)
                    cache.set(hash, this)
                }
            }
        }

        return Output
    }
}
