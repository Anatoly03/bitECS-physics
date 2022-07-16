import { addComponent, addEntity, defineQuery, IWorld, pipe } from 'bitecs'
import { Body, Pos, Vel, Collision } from './comps'
import { toArray } from './vertices'

let intersect: (a: { x: number, y: number }[], b: { x: number, y: number }[]) => { x: number, y: number }[]
(async () => intersect = await import('polygons-intersect'))()

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

            let verticesA = toArray(world, Body.vertices[bodyA]).map(({ x, y }) => ({ x: x + Pos.x[bodyA], y: y + Pos.y[bodyA] }))
            let verticesB = toArray(world, Body.vertices[bodyB]).map(({ x, y }) => ({ x: x + Pos.x[bodyB], y: y + Pos.y[bodyB] }))

            if (intersect(verticesA, verticesB).length == 0) continue

            // bodyA <<< bodyB
            // detect collision here

            console.log('contact', bodyA, bodyB)
        }
    }

    return world
}

/**
 * @rewrite Matter.js/collision/Collision.js, line 62
 * @description
 */
export function collides(world: IWorld, bodyA: number, bodyB: number) {
    //
}

/**
 * @rewrite Matter.js/collision/Collision.js, line 170
 * @description Find the overlap between two bodies
 */
export function bodiesOverlap(world: IWorld, bodyA: number, bodyB: number) {
    let verticesA = toArray(world, Body.vertices[bodyA])
    let verticesB = toArray(world, Body.vertices[bodyB])

    /*var verticesALength = verticesA.length,
        verticesBLength = verticesB.length,
        verticesAX = Pos.x[verticesA[0]],
        verticesAY = Pos.y[verticesA[0]],
        verticesBX = Pos.x[verticesB[0]],
        verticesBY = Pos.y[verticesB[0]],
        axesLength = axes.length,
        overlapMin = Number.MAX_VALUE,
        overlapAxisNumber = 0,
        overlap,
        overlapAB,
        overlapBA,
        dot,
        i,
        j;

    for (i = 0; i < axesLength; i++) {
        var axis = axes[i],
            axisX = axis.x,
            axisY = axis.y,
            minA = verticesAX * axisX + verticesAY * axisY,
            minB = verticesBX * axisX + verticesBY * axisY,
            maxA = minA,
            maxB = minB;

        for (j = 1; j < verticesALength; j += 1) {
            dot = verticesA[j].x * axisX + verticesA[j].y * axisY;

            if (dot > maxA) {
                maxA = dot;
            } else if (dot < minA) {
                minA = dot;
            }
        }

        for (j = 1; j < verticesBLength; j += 1) {
            dot = verticesB[j].x * axisX + verticesB[j].y * axisY;

            if (dot > maxB) {
                maxB = dot;
            } else if (dot < minB) {
                minB = dot;
            }
        }

        overlapAB = maxA - minB;
        overlapBA = maxB - minA;
        overlap = overlapAB < overlapBA ? overlapAB : overlapBA;

        if (overlap < overlapMin) {
            overlapMin = overlap;
            overlapAxisNumber = i;

            if (overlap <= 0) {
                // can not be intersecting
                break;
            }
        }
    }

    result.axis = axes[overlapAxisNumber];
    result.overlap = overlapMin;*/
}
