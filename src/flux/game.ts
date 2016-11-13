import schema from 'reducers/schema';

import {
    GAME_SET, GAME_INIT, GAME_FINISH
} from './constants';

/**
 * Sets currentGame
 */
export const set = (id: string) =>
    ({type: GAME_SET, id});

export const init = (list: Array<string>) =>
    ({type: GAME_INIT, list});

export const finish = () =>
    ({type: GAME_FINISH});

const getDefaultState = () =>
    immutable(schema.game);

export default (state = getDefaultState(), {type, id, list}) => {
    switch (type) {
        case GAME_SET:
            return state.merge({'currentGame': id, finished: false});

        case GAME_INIT:
            return state.set('list', list);

        case GAME_FINISH:
            return state.set('finished', true);
    }

    return state;
};
