<h1 align="center">bitECS-physics</h1>
<h3 align="center">
<a href="https://github.com/liabru/matter-js/">Matter.JS</a> rewritten physics engine for 
<a href="https://github.com/NateTheGreatt/bitECS/">bitECS</a></h3>

(This project is still in work)

```
npm i N/A
```

# Getting Started

N/A

# Documentation

## Bodies

A body is an entity which physically partakes with the engine.

### `Components.Body`

### `Components.Pos`

- x `f64` - _x position_
- y `f64` - _y position_

A component declaring an objects center.

### `Components.Vel`

- x `f64` - _x velocity_
- y `f64` - _y velocity_

A component declaring an objects velocity. Objects without the Velocity component are static. To move, objects also require the Position component

### `Components.Acc`

- x `f64` - _x acceleration_
- y `f64` - _y acceleration_

A component declaring an objects acceleration. To change speed, objects also require the Velocity component.

### `Components.Rotation`

- angle `f64` - _rotation of the body along its' center_

A component declaring an objects rotation. Objects will rotate along their center point.

## Body Types

### `Components.Rectangle`

- w `f64` - _width_
- h `f64` - _height_

A component declaring the entity the behavior of a rectangle. The Position component defines the center of the rectangle.

### `Components.Circle`

- r `f64` - _radius_

A component declaring the entity the behavior of a circle. The Position component defines the center of the circle.