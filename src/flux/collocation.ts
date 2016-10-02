import schema from 'reducers/schema';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'games';

const COLLOCATION_MOVE_CHARACTER: string = 'COLLOCATION_MOVE_CHARACTER';
const COLLOCATION_MOVE_BOAT: string = 'COLLOCATION_MOVE_BOAT';
const COLLOCATION_INIT: string = 'COLLOCATION_INIT';

/**
 * Moves character to other position (form/to boat)
 */
export const moveCharacter = (id: string) =>
    ({type: COLLOCATION_MOVE_CHARACTER, id});

/**
 * Move boat to other riverside
 */
export const moveBoat = () =>
    ({type: COLLOCATION_MOVE_BOAT});

/**
 * Init new collocation
 */
export const init = (collocation: any) =>
    ({type: COLLOCATION_INIT, collocation});

const getDefaultState = () =>
    immutable(schema.collocation);

export default (state = getDefaultState(), {type, collocation, id}) => {
    switch (type) {
        case COLLOCATION_MOVE_CHARACTER:

            for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
                let index: number = state[item].indexOf(id);

                if (index !== -1) {
                    let moveTo = item === BOAT ? state.boatPosition : BOAT;

                    return state
                        .set(item, [...state[item].slice(0, index), ...state[item].slice(index + 1)])
                        .set(moveTo, state[moveTo].concat(id));
                }
            }

            return state;

        case COLLOCATION_MOVE_BOAT:
            return state.set('boatPosition', state.boatPosition === RIVERSIDE_LEFT ? RIVERSIDE_RIGHT : RIVERSIDE_LEFT);

        case COLLOCATION_INIT:
            return state.merge(collocation);
    }

    return state;
};
