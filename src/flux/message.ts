import schema from 'reducers/schema';
import immutable from 'immutability-helper';

import {MESSEGE_SET} from './constants';

/**
 * Sets message
 */
export const set = (content: string) =>
    ({type: MESSEGE_SET, content});

const getDefaultState = () =>
    schema.message;

export default (state = getDefaultState(), {type, content}) => {
    switch (type) {
        case MESSEGE_SET:
            return immutable(state, {content: {$set: content}});
    }

    return state;
};
