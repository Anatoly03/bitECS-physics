import { addComponent, addEntity, defineQuery, IWorld, pipe } from 'bitecs'
import { Body, Pos, Vel, Collision } from './comps'

const pos_vel_query = defineQuery([Pos, Vel])
const body_query = defineQuery([Body, Pos])

/**
 * Collision is detected movable objects and all objects.
 */

export function detectCollision(world: IWorld) {
    /*const entities = pos_vel_query(world)
    const bodies = body_query(world)

    for (let i = 0; i < entities.length; i++) {
        const eid = entities[i]
        for (let j = 0; j < bodies.length; j++) {
            const cid = bodies[j]
            if (eid === cid) continue

            const dx = Pos.x[eid] - Pos.x[cid]
            const dy = Pos.y[eid] - Pos.y[cid]
            const r1 = Circle.r[eid]
            const r2 = Circle.r[cid]
            const dist = dx * dx + dy * dy

            if (dist < (r1 + r2) ** 2) {
                let collision = addEntity(world)

                addComponent(world, Collision, collision)
                Collision.eid[collision] = eid
                Collision.cid[collision] = cid

                Vel.x[eid] *= -1 // Vel.x[eid]
                Vel.y[eid] *= -1 // Vel.y[eid]

                console.log('contact')
            }
        }
    }*/

    return world
}