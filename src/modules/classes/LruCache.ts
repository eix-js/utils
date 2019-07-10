/**
 * Original java version from https://www.geeksforgeeks.org/design-a-data-structure-for-lru-cache/
 */

export class LruCacheNode<T> {
    public previous: LruCacheNode<T> = null
    public next: LruCacheNode<T> = null

    public constructor(public key: number, public data: T | null) {}
}

export class LruCache<T> {
    private hashMap = new Map<number, LruCacheNode<T>>()
    private head = new LruCacheNode<T>(0, null)
    private tail = new LruCacheNode<T>(0, null)
    private length = 0

    public constructor(private limit = Infinity) {
        this.head.next = this.tail
        this.tail.previous = this.head
    }

    private delete(node: LruCacheNode<T>) {
        node.previous.next = node.next
        node.next.previous = node.previous

        return this
    }

    private addToHead(node: LruCacheNode<T>) {
        node.next = this.head.next
        node.next.previous = node
        node.previous = this.head
        this.head.next = node

        return this
    }

    private moveOnTop(node: LruCacheNode<T>) {
        this.delete(node).addToHead(node)

        return this
    }

    public get(key: number) {
        const node = this.hashMap.get(key)

        if (node) {
            this.moveOnTop(node)
            return node.data
        }

        return null
    }

    public set(key: number, data: T) {
        const node = this.hashMap.get(key)

        if (node) {
            node.data = data
            this.moveOnTop(node)
        } else {
            const node = new LruCacheNode(key, data)
            this.hashMap.set(key, node)

            if (++this.length > this.limit) {
                const toRemove = this.tail.previous

                this.hashMap.delete(toRemove.key)
                this.delete(toRemove)
            }

            this.addToHead(node)
        }
    }
}
