import schema from 'reducers/schema';
import immutable from 'immutability-helper';

import {
    GAME_SET, GAME_INIT, GAME_FINISH
} from './constants';

import {IGameState} from 'flux/types';

/**
 * Sets currentGame
 */
export const set = (id: string) =>
    ({type: GAME_SET, id});

export const init = (list: string[]) =>
    ({type: GAME_INIT, list});

export const finish = () =>
    ({type: GAME_FINISH});

const getDefaultState = (): IGameState =>
    schema.game;

export default (state: IGameState = getDefaultState(), {type, id, list}): IGameState => {
    switch (type) {
        case GAME_SET:
            return immutable(state, {$merge: {currentGame: id, finished: false}});

        case GAME_INIT:
            return immutable(state, {list: {$set: list}});

        case GAME_FINISH:
            return immutable(state, {finished: {$set: true}});
    }

    return state;
};
