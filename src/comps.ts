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

export const Vertex = defineComponent({
    next: Types.i32, // next edge, -1 for null
})

export const Body = defineComponent({
    vertices: Types.i32, // first edge
})

//
//
// COLLISION
//
//


export const Collision = defineComponent({
    // TODO, IMPROVE: COLLISION BETWEEN TWO ENTITIES?
    bodyA: Types.f64,
    bodyB: Types.f64
})

//
//
// TODO
//
//

export const Constraint = defineComponent({
    // TODO: add constraint type
})