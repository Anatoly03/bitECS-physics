import { addComponent, addEntity, IWorld } from 'bitecs'
import { Pos, Vertex } from './comps'
import { add, cross, div, mult } from './vec'

type Vertices = { x: number, y: number }[]

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
export function createVertices(world: IWorld, points: Vertices): number {
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
        points: Vertices = [];

    path.replace(pathPattern, (_, x, y) => {
        points.push({ x: parseFloat(x), y: parseFloat(y) })
        return ''
    });

    return createVertices(world, points);
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 89
 * @description Returns the centroid of a body
 * @param {number} eid Entity id of a vertex
 * @returns entity id of the first vertex
 */
export function centre(vertices: Vertices) {
    let _area = area(vertices, true),
        centre = { x: 0, y: 0 },
        _cross,
        temp,
        j;

    for (var i = 0; i < vertices.length; i++) {
        j = (i + 1) % vertices.length;
        _cross = cross(vertices[i], vertices[j]);
        temp = mult(add(vertices[i], vertices[j]), _cross);
        centre = add(centre, temp);
    }

    return div(centre, 6 * _area);
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 112
 */
export function mean() {
    // TODO
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 130
 * @description area of body
 */
export function area(vertices: Vertices, signed: boolean): number {
    var area = 0,
        j = vertices.length - 1;

    for (var i = 0; i < vertices.length; i++) {
        area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
        j = i;
    }

    if (signed)
        return area / 2;

    return Math.abs(area) / 2;
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 152
 */
export function inertia() {
    // TODO
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 178
 */
export function translate() {
    // TODO
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 194
 */
export function rotate() {
    // TODO
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 233
 * @description Returns true if the point is within the polygon
 */
export function contains(vertices: Vertices, point: {x: number, y: number}): boolean {
    var pointX = point.x,
        pointY = point.y,
        verticesLength = vertices.length,
        vertex = vertices[verticesLength - 1],
        nextVertex;

    for (var i = 0; i < verticesLength; i++) {
        nextVertex = vertices[i];

        if ((pointX - vertex.x) * (nextVertex.y - vertex.y)
            + (pointY - vertex.y) * (vertex.x - nextVertex.x) > 0) {
            return false
        }

        vertex = nextVertex;
    }

    return true
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 262
 */
export function scale() {
    // TODO
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 291
 */
export function chamfer() {
    // TODO
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 361
 */
export function clockwiseSort() {
    // TODO
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 377
 */
export function isConvex() {
    // TODO
}

/**
 * @rewrite Matter.js/geometry/Vertices.js, line 377
 */
export function hull() {
    // TODO
}

/**
 * @description Converts a linked list of entities (vertices) to an array
 * @returns array of vertex id's
 */
export function toArray(world: IWorld, vertex: number): number[] {
    let vertices: number[] = []
    let first_vertex = vertex

    while (true) {
        vertices.push(vertex)
        vertex = Vertex.next[vertex]
        if (vertex === first_vertex) break
    }

    return vertices
}