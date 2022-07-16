import { normalise } from './math/vec'

/**
 * @rewrite Matter.js/geometry/Axes.js, line 22
 * @rewrite Matter.js/core/Common.js, line 95, added at the end of return
 */
export function fromVertices(vertices: { x: number, y: number }[]) {
    let axes: { [key: number]: { x: number, y: number } } = {}
    var values : { x: number, y: number }[] = []

    for (var i = 0; i < vertices.length; i++) {
        let j = (i + 1) % vertices.length,
            normal = normalise({
                x: vertices[j].y - vertices[i].y,
                y: vertices[i].x - vertices[j].x
            }),
            gradient = (normal.y === 0) ? Infinity : (normal.x / normal.y)

        // limit precision
        gradient = parseFloat(gradient.toFixed(3))
        axes[gradient] = normal;
    }

    var keys = Object.keys(axes);
    for (var i = 0; i < keys.length; i++) {
        const key = keys[i]
        values.push(axes[key]);
    }
    return values
}

/**
 * @rewrite Matter.js/geometry/Axes.js, line 48
 */
export function rotate(axes : { x: number, y: number }[], angle: number) {
    if (angle === 0) return

    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    for (var i = 0; i < axes.length; i++) {
        var axis = axes[i],
            xx;
        xx = axis.x * cos - axis.y * sin;
        axis.y = axis.x * sin + axis.y * cos;
        axis.x = xx;
    }
}