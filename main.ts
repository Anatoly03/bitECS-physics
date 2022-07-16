import { createEngine, Components, createRender, addRectangle, addPolygon, addCircle } from './src/index'
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
    const floor = addRectangle(world, 100, 400, canvas.width - 200, 50)
    const ball = addCircle(world, 300, 200, 50)
    const ball2 = addPolygon(world, 300, 200, 50, 7)
    
    addComponent(world, Components.Vel, ball)
    addComponent(world, Components.Acc, ball)

    Components.Pos.x[ball] = canvas.width * .5 - 300
    Components.Pos.y[ball] = 300
    Components.Acc.x[ball] = 0.005

    addComponent(world, Components.Vel, ball2)
    addComponent(world, Components.Acc, ball2)

    Components.Pos.x[ball2] = canvas.width * .5 + 300
    Components.Pos.y[ball2] = 250
    Components.Acc.x[ball2] = -0.005
}

window.onload = () => {
    init()
    createBodies()
}