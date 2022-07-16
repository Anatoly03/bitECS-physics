import { addComponent, addEntity, IWorld } from 'bitecs'
import { Body, Pos } from './comps'
import { fromPath } from './vertices'

/**
 * @rewrite Matter.js/factory/Bodies.js, line 36
 * @description creates a rectangle
 */
export function addRectangle(world: IWorld, x: number, y: number, width: number, height: number): number {
    const eid = addEntity(world)
    const vertex = fromPath(world, 'L 0 0 L ' + width + ' 0 L ' + width + ' ' + height + ' L 0 ' + height)

    addComponent(world, Pos, eid)
    addComponent(world, Body, eid)

    Pos.x[eid] = x
    Pos.y[eid] = y
    Body.vertices[eid] = vertex

    return eid
}

/**
 * @rewrite Matter.js/factory/Bodies.js, line 113
 * @description creates an (almost) circule
 */
export function addCircle(world: IWorld, x: number, y: number, radius: number): number {
    return addPolygon(world, x, y, radius, 32)
}

/**
 * @rewrite Matter.js/factory/Bodies.js, line 144
 * @description creates a regular polygon
 */
export function addPolygon(world: IWorld, x: number, y: number, radius: number, sides: number): number {
    if (sides < 3) return addCircle(world, x, y, radius)

    var theta = 2 * Math.PI / sides,
        path = '',
        offset = theta * 0.5;

    for (var i = 0; i < sides; i += 1) {
        var angle = offset + (i * theta),
            xx = Math.cos(angle) * radius,
            yy = Math.sin(angle) * radius;

        path += 'L ' + xx.toFixed(3) + ' ' + yy.toFixed(3) + ' ';
    }

    const eid = addEntity(world)
    const vertex = fromPath(world, path)

    addComponent(world, Pos, eid)
    addComponent(world, Body, eid)

    Pos.x[eid] = x
    Pos.y[eid] = y
    Body.vertices[eid] = vertex

    return eid
}