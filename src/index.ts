import { IWorld } from 'bitecs'
import * as Components from './comps'
import { update } from './service'

export function createEngine(world: IWorld): IWorld {
    setInterval(() => {
        update(world)
    }, 16)

    return world
}

export {
    Components
}