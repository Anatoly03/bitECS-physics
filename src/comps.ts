import { defineComponent, Types } from 'bitecs'

//
//
// PHYSICS
//
//

export const Pos = defineComponent({
    x: Types.f64,
    y: Types.f64
})

export const Vel = defineComponent({
    x: Types.f64,
    y: Types.f64
})

export const Acc = defineComponent({
    x: Types.f64,
    y: Types.f64
})

export const Rotation = defineComponent({
    angle: Types.f64,
})

//
//
// BODIES / OBJECTS
//
//

export const Edge = defineComponent({
    x: Types.f64,
    y: Types.f64,
    next: Types.i32, // next edge
})

export const Body = defineComponent({
    edge: Types.i32, // first edge
})

export const Rectangle = defineComponent({
    w: Types.f64,
    h: Types.f64
})

export const Circle = defineComponent({
    r: Types.f64,
})

//
//
// TODO
//
//

export const Constraint = defineComponent({
    // TODO: add constraint type
})

export const Collision = defineComponent({
    // TODO, IMPROVE: COLLISION BETWEEN TWO ENTITIES?
    eid: Types.f64,
    cid: Types.f64
})
