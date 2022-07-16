import { addComponent, addEntity, defineQuery, IWorld, pipe } from 'bitecs'
import { Body, Pos, Vel, Collision } from './comps'

const moving_bodies_query = defineQuery([Body, Pos, Vel])
const body_query = defineQuery([Body, Pos])

/**
 * @rewrite Matter.js/collision/Detector.js, line 59
 * @description Runs through all moving bodies to check if they collide with
 * any other bodies.
 */
export function detectCollision(world: IWorld) {
    const moving_bodies = moving_bodies_query(world)
    const bodies = body_query(world)

    for (let i = 0; i < moving_bodies.length; i++) {
        let bodyA = moving_bodies[i]

        for (let j = 0; j < bodies.length; j++) {
            let bodyB = bodies[i]
            if (bodyA >= bodyB) continue

            // bodyA <<< bodyB
            // detect collision here

            console.log('contact', bodyA, bodyB)
        }
    }

    return world
}