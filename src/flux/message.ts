import schema from 'reducers/schema';

const MESSEGE_SET: string = 'MESSEGE_SET';

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
