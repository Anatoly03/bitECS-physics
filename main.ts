import { Components } from './src/index'
import { defineQuery } from 'bitecs'

// FPS
let lastCalledTime = Date.now()
let fps = 0

// CANVAS
let canvas = <HTMLCanvasElement>document.getElementById('canvas')
let ctx = <CanvasRenderingContext2D>{}

function init() {
    canvas = <HTMLCanvasElement>document.getElementById('canvas')
    ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false
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
function render_objects() {
    //
}

window.onload = () => {
    init()
    update()
}