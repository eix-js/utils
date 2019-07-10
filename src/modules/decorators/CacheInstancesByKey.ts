import { Decorable } from '../../common/lang/Decorable'
import { LruCache } from '../classes/LruCache'

/**
 * source: https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
 */
export function hashCode(s: string) {
    for (var i = 0, h = 0; i < s.length; i++)
        h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
    return h
}

export const CacheInstancesByKey = (limit = Infinity) => {
    return <T extends Decorable<{}>>(Input: T) => {
        const cache = new LruCache<Output>(limit)

        class Output extends Input {
            constructor(...args: any[]) {
                const key = args[0] as string

                const hash = hashCode(key)
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
