import { compareArrays } from '../helpers/compareArrays'

export interface InstanceData<T> {
    instance: T
    parameters: unknown[]
}

export class InstanceStore<T> {
    private instances: InstanceData<T>[] = []

    public add(parameters: unknown[], instance: T) {
        this.instances.push({
            parameters,
            instance
        })
    }

    public get(parameters: unknown[]): T | null {
        const result = this.instances.find(data =>
            compareArrays(parameters, data.parameters)
        )

        if (result) {
            return result.instance
        } else return null
    }
}
