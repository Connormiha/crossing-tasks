import schema from 'reducers/schema';
import immutable from 'immutability-helper';

import {MESSEGE_SET} from './constants';
import {IMessageState} from 'flux/types';

/**
 * Sets message
 */
export const set = (content: string) =>
    ({type: MESSEGE_SET, content});

const getDefaultState = (): IMessageState =>
    schema.message;

export default (state: IMessageState = getDefaultState(), {type, content}): IMessageState => {
    switch (type) {
        case MESSEGE_SET:
            return immutable(state, {content: {$set: content}});
    }

    return state;
};
