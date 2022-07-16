type Vec2 = { x: number, y: number }

/**
 * @rewrite Matter.js/geometry/Vector.js, line 26
 */
export function vec(x: number, y: number): Vec2 {
    return { x: x || 0, y: y || 0 }
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 36
 */
export function vecClone(vector: Vec2) {
    return { x: vector.x, y: vector.y }
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 46
 */
export function magnitude(vector: Vec2) {
    return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 56
 */
export function magnitudeSquared(vector: Vec2) {
    return (vector.x * vector.x) + (vector.y * vector.y)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 68
 */
export function rotate(vector: Vec2, angle: number) {
    let cos = Math.cos(angle), sin = Math.sin(angle),
        x = vector.x * cos - vector.y * sin
    return vec(x,
        vector.x * sin + vector.y * cos)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 86
 */
export function rotateAbout(vector: Vec2, point: Vec2, angle: number) {
    let cos = Math.cos(angle), sin = Math.sin(angle),
        x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin)
    return vec(x,
        point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos))
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 101
 */
export function normalise(vector: Vec2) {
    let m = magnitude(vector);
    if (m === 0) return vec(0, 0)
    return vec(vector.x / m, vector.y / m)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 115
 */
export function dot(vectorA: Vec2, vectorB: Vec2) {
    return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 126
 */
export function cross(vectorA: Vec2, vectorB: Vec2) {
    return (vectorA.x * vectorB.x) - (vectorA.y * vectorB.y)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 138
 */
export function cross3(vectorA: Vec2, vectorB: Vec2, vectorC: Vec2) {
    return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 150
 */
export function add(vectorA: Vec2, vectorB: Vec2) {
    return vec(vectorA.x + vectorB.x, vectorA.y + vectorB.y)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 165
 */
export function sub(vectorA: Vec2, vectorB: Vec2) {
    return vec(vectorA.x - vectorB.x, vectorA.y - vectorB.y)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 179
 */
export function mult(vector: Vec2, scalar: number) {
    return vec(vector.x * scalar, vector.y * scalar)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 190
 */
export function div(vector: Vec2, scalar: number) {
    return mult(vector, 1 / scalar)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 201
 */
export function perp(vector: Vec2, negate: boolean = false) {
    // negate = negate === true ? -1 : 1;
    // return vec (negate * -vector.y, negate * vector.x)
    return negate ? vec(-vector.y, vector.x) : vec(vector.y, -vector.x)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 212
 */
export function neg(vector: Vec2) {
    return mult(vector, -1)
}

/**
 * @rewrite Matter.js/geometry/Vector.js, line 224
 */
export function angle(vectorA: Vec2, vectorB: Vec2) {
    return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x)
}