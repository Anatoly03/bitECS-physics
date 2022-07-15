import { defineQuery, IWorld, pipe } from 'bitecs'
import { Acc, Pos, Vel, Rotation, Rectangle, Circle } from './comps'

let lastCalledTime = Date.now()
let fps = 0
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

/**
 * Render Rectangles
 */

const rectangles_query = defineQuery([Pos, Rectangle])
function render_rectangles(world: IWorld) {
    const rectangles = rectangles_query(world)

    for (let i = 0; i < rectangles.length; i++) {
        const eid = rectangles[i]
        const x = Pos.x[eid]
        const y = Pos.y[eid]
        const w = Rectangle.w[eid]
        const h = Rectangle.h[eid]

        ctx.translate(x, y)
        ctx.rotate(Rotation.angle[eid])

        ctx.strokeStyle = 'white'
        ctx.strokeRect(- w * .5, - h * .5, w, h)

        ctx.rotate(-Rotation.angle[eid])
        ctx.translate(-x, -y)
    }

    return world
}

/**
 * Render Circles
 */

const circles_query = defineQuery([Pos, Circle])
function render_circles(world: IWorld) {
    const circles = circles_query(world)

    for (let i = 0; i < circles.length; i++) {
        const eid = circles[i]
        const x = Pos.x[eid]
        const y = Pos.y[eid]
        const r = Circle.r[eid]

        ctx.translate(x, y)
        ctx.rotate(Rotation.angle[eid])

        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.ellipse(0, 0, r, r, Math.PI / 4, 0, 2 * Math.PI)
        ctx.stroke()

        ctx.rotate(-Rotation.angle[eid])
        ctx.translate(-x, -y)
    }

    return world
}

/**
 * Render Center Dots of Entities
 */

const position_query = defineQuery([Pos])
function render_centers(world: IWorld) {
    const entities = position_query(world)

    for (let i = 0; i < entities.length; i++) {
        const eid = entities[i]
        const x = Pos.x[eid]
        const y = Pos.y[eid]

        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.ellipse(x, y, 2, 2, Math.PI / 4, 0, 2 * Math.PI)
        ctx.fill()
    }

    return world
}

function calc_fps() {
    let delta = (Date.now() - lastCalledTime) / 1000
    lastCalledTime = Date.now()
    fps = 1 / delta
}

function display_fps() {
    ctx.textAlign = 'left'
    ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText(fps.toPrecision(2).toString(), 10, 30)
}

const render__pipe = pipe(
    render_rectangles,
    render_circles,
    render_centers,
)

function set_background(color: string) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

/**
 * @exports
 */

export function createRender(params: {
    canvas: HTMLCanvasElement,
    world: IWorld,
}) {
    canvas = <HTMLCanvasElement>params.canvas
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false

    return setInterval(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        ctx = canvas.getContext("2d")
        set_background("black")
        render__pipe(params.world)
        calc_fps()
        display_fps()
    }, 16)
}