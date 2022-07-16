import { createWorld, defineQuery, IWorld, pipe } from 'bitecs'
import { Acc, Body, Circle, Pos, Vel } from './comps'
import { detectCollision } from './collision'

const pos_vel_query = defineQuery([Pos, Vel])
const vel_acc_query = defineQuery([Vel, Acc])

/**
 * s'(t) = v(t)
 * 
 * Position is updated relative to the velocity.
 */

function incrementPosition(world: IWorld) {
    const entities = pos_vel_query(world)

    for (let i = 0; i < entities.length; i++) {
        const eid = entities[i]
        Pos.x[eid] += Vel.x[eid]
        Pos.y[eid] += Vel.y[eid]
    }

    return world
}

/**
 * v'(t) = a(t)
 * 
 * Velocity is updated relative to the acceleration.
 */

function incrementVelocity(world: IWorld) {
    const entities = vel_acc_query(world)

    for (let i = 0; i < entities.length; i++) {
        const eid = entities[i]
        Vel.x[eid] += Acc.x[eid]
        Vel.y[eid] += Acc.y[eid]
    }

    return world
}

/**
 * @exports
 */

export const update = pipe(
    incrementPosition,
    incrementVelocity,
    detectCollision
)

export function createEngine(world?: IWorld): IWorld {
    if (world == null) return createEngine(createWorld())
    setInterval(() => update(world), 16)
    return world
}