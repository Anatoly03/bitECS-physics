import { createWorld, defineQuery, IWorld, pipe } from 'bitecs'
import { Acc, Body, Circle, Pos, Vel } from './comps'

const pos_vel_query = defineQuery([Pos, Vel])
const vel_acc_query = defineQuery([Vel, Acc])
const body_query = defineQuery([Body, Circle, Pos])

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
 * Collision is detected movable objects and all objects.
 */

function detectCollision(world: IWorld) {
    const entities = pos_vel_query(world)
    const bodies = body_query(world)

    for (let i = 0; i < entities.length; i++) {
        const eid = entities[i]
        for (let j = 0; j < bodies.length; j++) {
            const bid = bodies[j]
            if (eid === bid) continue

            const dx = Pos.x[eid] - Pos.x[bid]
            const dy = Pos.y[eid] - Pos.y[bid]
            const r1 = Circle.r[eid]
            const r2 = Circle.r[bid]
            const dist = dx * dx + dy * dy

            if (dist < (r1 + r2) ** 2) {
                Vel.x[eid] *= -1 // Vel.x[eid]
                Vel.y[eid] *= -1 // Vel.y[eid]

                console.log('contact')
            }
        }
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