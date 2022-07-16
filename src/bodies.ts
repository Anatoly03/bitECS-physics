import { addEntity, IWorld } from 'bitecs'

export function addRectangle(world: IWorld): number {
    const eid = addEntity(world)

    // rectangle x, y, w, h

    return eid
}

export function addCircle(world: IWorld): number {
    // detailed polygonal representation of a circle
    // x, y, r
    // createPolygon(..., x, y, r, CONST n)

    return addPolygon(world)
}

export function addPolygon(world: IWorld): number {
    const eid = addEntity(world)

    // polygon x, y, r, n

    return eid
}