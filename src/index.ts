import { createWorld, IWorld } from 'bitecs'
import * as Components from './comps'
import { update } from './service'
import { createRender } from './render'

export function createEngine(world?: IWorld): IWorld {
    if (world == null) return createEngine(createWorld())
    setInterval(() => update(world), 16)
    return world
}

export {
    Components,
    createRender
}