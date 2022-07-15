import { createEngine, Components } from './src/index'
import { createWorld, addEntity, addComponent, defineQuery } from 'bitecs'

let lastCalledTime = Date.now()
let fps = 0
let canvas = <HTMLCanvasElement>document.getElementById('canvas')
let ctx = <CanvasRenderingContext2D>{}

let world = createWorld()

function init() {
    canvas = <HTMLCanvasElement>document.getElementById('canvas')
    ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false
    createEngine(world)
}

function createBodies() {
    const floor = addEntity(world)
    addComponent(world, Components.Pos, floor)
    addComponent(world, Components.Rectangle, floor)

    Components.Pos.x[floor] = canvas.width * .5
    Components.Pos.y[floor] = 500
    Components.Rectangle.w[floor] = canvas.width - 200
    Components.Rectangle.h[floor] = 50

    const ball = addEntity(world)
    addComponent(world, Components.Pos, ball)
    addComponent(world, Components.Circle, ball)
    addComponent(world, Components.Vel, ball)
    addComponent(world, Components.Acc, ball)

    Components.Pos.x[ball] = canvas.width * .5
    Components.Pos.y[ball] = 300
    Components.Circle.r[ball] = 50
    Components.Vel.x[ball] = -0.1
    Components.Acc.y[ball] = 0.0001
}

function update() {
    requestAnimationFrame(update.bind(this))
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx = canvas.getContext("2d")

    calc_fps()
    set_background("black")
    render_objects()
    display_fps()
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

function set_background(color: string) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const rectangles_query = defineQuery([Components.Pos, Components.Rectangle])
const circles_query = defineQuery([Components.Pos, Components.Circle])
function render_objects() {
    const rectangles = rectangles_query(world)
    const circles = circles_query(world)

    for (let i = 0; i < rectangles.length; i++) {
        const eid = rectangles[i]
        const x = Components.Pos.x[eid]
        const y = Components.Pos.y[eid]
        const w = Components.Rectangle.w[eid]
        const h = Components.Rectangle.h[eid]

        ctx.translate(x, y)
        ctx.rotate(Components.Rotation.angle[eid])

        ctx.strokeStyle = 'white'
        ctx.strokeRect(- w * .5, - h * .5, w, h)

        ctx.rotate(-Components.Rotation.angle[eid])
        ctx.translate(-x, -y)
    }

    for (let i = 0; i < circles.length; i++) {
        const eid = circles[i]
        const x = Components.Pos.x[eid]
        const y = Components.Pos.y[eid]
        const r = Components.Circle.r[eid]

        ctx.translate(x, y)
        ctx.rotate(Components.Rotation.angle[eid])

        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.ellipse(0, 0, r, r, Math.PI / 4, 0, 2 * Math.PI)
        ctx.stroke()

        ctx.rotate(-Components.Rotation.angle[eid])
        ctx.translate(-x, -y)
    }
}

window.onload = () => {
    init()
    update()
    createBodies()
}