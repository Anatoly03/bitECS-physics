import { addComponent, addEntity, IWorld } from 'bitecs'
import { Pos, Vertex } from './comps'

/**
 * @returns entity id
 */
function addVertex(world: IWorld, x: number, y: number, next: number): number {
    const eid = addEntity(world)

    addComponent(world, Vertex, eid)
    addComponent(world, Pos, eid)

    Pos.x[eid] = x
    Pos.y[eid] = y
    Vertex.next[eid] = next

    return eid
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 44
 * @description creates a linked list of entities (vertices) from a point array
 * @returns entity id of the first vertex
 */
export function createVertices(world: IWorld, points: { x: number, y: number }[]): number {
    let first
    let current

    for (var i = 0; i < points.length; i++) {
        let point = points[i]
        current = addVertex(world, point.x, point.y, current)
        if (i == 0) first = current
    }

    Vertex.next[first] = current

    return first
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 72
 * @description creates a linked list of entities (vertices) from a point array
 * @returns entity id of the first vertex
 */
export function fromPath(world: IWorld, path: string): number {
    var pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,
        points: { x: number, y: number }[] = [];

    path.replace(pathPattern, (_, x, y) => {
        points.push({ x: parseFloat(x), y: parseFloat(y) })
        return ''
    });

    return createVertices(world, points);
}