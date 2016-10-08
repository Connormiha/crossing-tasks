import schema from 'reducers/schema';

import {MESSEGE_SET} from './constants';

/**
 * Sets message
 */
export const set = (content: string) =>
    ({type: MESSEGE_SET, content});

const getDefaultState = () =>
    immutable(schema.message);

export default (state = getDefaultState(), {type, content}) => {
    switch (type) {
        case MESSEGE_SET:
            return state.set('content', content);
    }

    return state;
};
