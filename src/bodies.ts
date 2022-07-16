import { addEntity, IWorld } from 'bitecs'

export function createRectangle(world: IWorld): number {
    const eid = addEntity(world)

    // rectangle x, y, w, h

    return eid
}

export function createCircle(world: IWorld): number {
    // detailed polygonal representation of a circle
    // x, y, r
    // createPolygon(..., x, y, r, CONST n)

    return createPolygon(world)
}

export function createPolygon(world: IWorld): number {
    const eid = addEntity(world)

    // polygon x, y, r, n

    return eid
}