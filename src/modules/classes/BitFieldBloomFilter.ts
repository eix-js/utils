export type HashFunction<T> = (data: T) => bigint

export class BitFieldBloomFilter<T> {
    private functions: HashFunction<T>[]
    private memory = 0n

    public constructor(...functions: HashFunction<T>[]) {
        this.functions = functions
    }

    public add(...data: T[]) {
        for (const value of data) {
            for (const hashingFunctions of this.functions) {
                const position = hashingFunctions(value)
                this.memory = this.memory | (1n << position)
            }
        }

        return this
    }

    public test(data: T) {
        for (const hashingFunctions of this.functions) {
            const position = hashingFunctions(data)

            if (this.memory & (1n << position)) continue
            return false
        }

        return true
    }
}
