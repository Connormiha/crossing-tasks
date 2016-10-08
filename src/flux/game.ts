import schema from 'reducers/schema';

import {
    GAME_SET, GAME_INIT
} from './constants';

/**
 * Sets currentGame
 */
export const set = (id: string) =>
    ({type: GAME_SET, id});

export const init = (list: Array<string>) =>
    ({type: GAME_INIT, list});

const getDefaultState = () =>
    immutable(schema.game);

export default (state = getDefaultState(), {type, id, list}) => {
    switch (type) {
        case GAME_SET:
            return state.set('currentGame', id);

        case GAME_INIT:
            return state.set('list', list);
    }

    return state;
};
