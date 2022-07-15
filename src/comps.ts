import { defineComponent, Types } from 'bitecs'

//
//
// PHYSICS
//
//

/**
 * @component **Entity Position**
 * @description This will give the entity a position
 */
export const Pos = defineComponent({
    x: Types.f64,
    y: Types.f64
})

/**
 * @component **Entity Velocity**
 * @description This will give the entity the ability to move. Entities without
 * Velocity are static.
 */
export const Vel = defineComponent({
    x: Types.f64,
    y: Types.f64
})

/**
 * @component **Entity Acceleration**
 * @description This will give the entity the ability to change velocity.
 */
export const Acc = defineComponent({
    x: Types.f64,
    y: Types.f64
})

/**
 * @component **Entity Rotation**
 * @description An entity will rotate if this component is present.
 */
export const Rotation = defineComponent({
    x: Types.f64,
    y: Types.f64
})

//
//
// OBJECTS
//
//

export const Rectangle = defineComponent({
    w: Types.f64,
    h: Types.f64
})

export const Circle = defineComponent({
    r: Types.f64,
})

