import { defineQuery, IWorld, pipe } from 'bitecs'
import { Pos, Vel } from './comps'

const pos_inc_query = defineQuery([Pos, Vel])
function incrementPosition(world: IWorld) {
    const entities = pos_inc_query(world)

    for (let i = 0; i < entities.length; i++) {
        const eid = entities[i]
        Pos.x[eid] += Vel.x[eid]
        Pos.y[eid] += Vel.y[eid]
    }

    return world
}

export const update = pipe(
    incrementPosition
)