import { defineQuery, IWorld, pipe } from 'bitecs'
import { Acc, Pos, Vel } from './comps'

/**
 * s'(t) = v(t)
 * 
 * Position is updated relative to the velocity.
 */

const pos_inc_query = defineQuery([Pos, Vel])
function incrementPosition(world: IWorld) {
    const entities = pos_inc_query(world)

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

const vel_inc_query = defineQuery([Vel, Acc])
function incrementVelocity(world: IWorld) {
    const entities = vel_inc_query(world)

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
    incrementVelocity
)