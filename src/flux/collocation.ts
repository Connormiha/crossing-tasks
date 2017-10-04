import schema from 'reducers/schema';
import immutable from 'immutability-helper';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'games';

import {
    COLLOCATION_MOVE_CHARACTER, COLLOCATION_MOVE_BOAT, COLLOCATION_INIT
} from './constants';

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

const getDefaultState = (): any =>
    schema.collocation;

export default (state = getDefaultState(), {type, collocation, id}) => {
    switch (type) {
        case COLLOCATION_MOVE_CHARACTER:
            for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
                const index: number = state[item].indexOf(id);

                if (index !== -1) {
                    let moveTo = item === BOAT ? state.boatPosition : BOAT;

                    return immutable(
                        state,
                        {
                            [item]: {
                                $set: [...state[item].slice(0, index), ...state[item].slice(index + 1)],
                            },
                            [moveTo]: {
                                $set: state[moveTo].concat(id),
                            },
                        },
                    );
                }
            }

            return state;

        case COLLOCATION_MOVE_BOAT:
            return immutable(state, {boatPosition: {$set: state.boatPosition === RIVERSIDE_LEFT ? RIVERSIDE_RIGHT : RIVERSIDE_LEFT}});

        case COLLOCATION_INIT:
            return immutable(state, {$merge: {...collocation, boatPosition: RIVERSIDE_LEFT}});
    }

    return state;
};
