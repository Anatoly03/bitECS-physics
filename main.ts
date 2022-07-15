import { createEngine, Components, createRender } from './src/index'
import { createWorld, addEntity, addComponent, defineQuery } from 'bitecs'

let canvas = <HTMLCanvasElement>document.getElementById('canvas')
let ctx : CanvasRenderingContext2D

let world = createWorld()

function init() {
    canvas = <HTMLCanvasElement>document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false
    
    createEngine(world)
    createRender({
        canvas: canvas,
        world: world
    })
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

window.onload = () => {
    init()
    createBodies()
}