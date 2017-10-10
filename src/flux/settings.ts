import schema from 'reducers/schema';
import immutable from 'immutability-helper';

import {
    SETTINGS_SET_VOLUME
} from './constants';

import {ISettingsState} from 'flux/types';

/**
 * Sets sound volume
 */
export const setVolume = (volume: number) =>
    ({type: SETTINGS_SET_VOLUME, volume});

const getDefaultState = (): ISettingsState =>
    schema.settings;

export default (state: ISettingsState = getDefaultState(), {type, volume}): ISettingsState => {
    switch (type) {
        case SETTINGS_SET_VOLUME:
            return immutable(state, {volume: {$set: volume}});
    }

    return state;
};
