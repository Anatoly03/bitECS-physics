import { defineQuery, IWorld, pipe } from 'bitecs'
import { Acc, Pos, Vel, Rotation, Vertex, Body } from './comps'
import { centre, toArray } from './vertices'

let lastCalledTime = Date.now()
let fps = 0
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const body_query = defineQuery([Pos, Body])

/**
 * Render Bodies and their vertices
 */

function render_bodies(world: IWorld) {
    const bodies = body_query(world)

    ctx.strokeStyle = 'white'
    for (let i = 0; i < bodies.length; i++) {
        const eid = bodies[i]
        let vertex = Body.vertices[eid],
            first_vertex = vertex
        let x = Pos.x[eid],
            y = Pos.y[eid]

        ctx.translate(x, y)
        ctx.beginPath()

        while (true) {
            ctx.lineTo(Pos.x[vertex], Pos.y[vertex])

            vertex = Vertex.next[vertex]
            if (vertex === first_vertex) {
                ctx.lineTo(Pos.x[vertex], Pos.y[vertex])
                break
            }
        }

        ctx.stroke()
        ctx.translate(-x, -y)
    }

    return world
}

/**
 * Render Body Centres
 */

function render_body_centre(world: IWorld) {
    const bodies = body_query(world)

    ctx.fillStyle = 'red'
    for (let i = 0; i < bodies.length; i++) {
        const eid = bodies[i]
        let _centre = centre(toArray(world, Body.vertices[eid]))

        let x = Pos.x[eid] + _centre.x,
            y = Pos.y[eid] + _centre.y

        // BUG!
        // RECTANGLE FLOOR ISN'T VISIBLE HERE
        //
        // console.log(x, y)

        ctx.translate(x, y)
        ctx.fillRect(-1, -1, 2, 2)
        ctx.translate(-x, -y)
    }

    return world
}

/**
 * FPS / PIPE
 */

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
    render_bodies,
    render_body_centre,
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