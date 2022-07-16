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
    addComponent(world, Components.Body, floor)
    addComponent(world, Components.Pos, floor)
    addComponent(world, Components.Rectangle, floor)

    Components.Pos.x[floor] = canvas.width * .5
    Components.Pos.y[floor] = 500
    Components.Rectangle.w[floor] = canvas.width - 200
    Components.Rectangle.h[floor] = 50

    const ball = addEntity(world)
    addComponent(world, Components.Body, ball)
    addComponent(world, Components.Pos, ball)
    addComponent(world, Components.Circle, ball)
    addComponent(world, Components.Vel, ball)
    addComponent(world, Components.Acc, ball)

    Components.Pos.x[ball] = canvas.width * .5 - 300
    Components.Pos.y[ball] = 300
    Components.Circle.r[ball] = 50
    Components.Acc.x[ball] = 0.005

    const ball2 = addEntity(world)
    addComponent(world, Components.Body, ball2)
    addComponent(world, Components.Pos, ball2)
    addComponent(world, Components.Circle, ball2)
    addComponent(world, Components.Vel, ball2)
    addComponent(world, Components.Acc, ball2)

    Components.Pos.x[ball2] = canvas.width * .5 + 300
    Components.Pos.y[ball2] = 350
    Components.Circle.r[ball2] = 50
    Components.Acc.x[ball2] = -0.005
}

window.onload = () => {
    init()
    createBodies()
}