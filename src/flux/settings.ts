import schema from 'reducers/schema';
import immutable from 'immutability-helper';

import {
    SETTINGS_SET_VOLUME
} from './constants';

/**
 * Sets sound volume
 */
export const setVolume = (volume: string) =>
    ({type: SETTINGS_SET_VOLUME, volume});

const getDefaultState = () =>
    schema.settings;

export default (state = getDefaultState(), {type, volume}) => {
    switch (type) {
        case SETTINGS_SET_VOLUME:
            return immutable(state, {volume: {$set: volume}});
    }

    return state;
};
