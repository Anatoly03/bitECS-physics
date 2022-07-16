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

(Table of Contents goes here)

## Bodies

A body is an entity which physically partakes with the engine.

### Component `Pos`

- x `f64` - _x position_
- y `f64` - _y position_

A component declaring an objects position

### Component `Vel`

- x `f64` - _x velocity_
- y `f64` - _y velocity_

A component declaring an objects velocity. Objects without the Velocity component are static. To move, objects also require the Position component

### Component `Acc`

- x `f64` - _x acceleration_
- y `f64` - _y acceleration_

A component declaring an objects acceleration. To change speed, objects also require the Velocity component.

### Component `Rotation`

- angle `f64` - _rotation of the body along its' center_

A component declaring an objects rotation. Objects will rotate along their center point.

# In Work

src - project source
src_matter_js - <a href="https://github.com/liabru/matter-js/">matter-js</a> source, analysed for rewrite