import schema from 'reducers/schema';

export const GAME_SET: string = 'GAME_SET';
export const GAME_INIT: string = 'GAME_INIT';

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
