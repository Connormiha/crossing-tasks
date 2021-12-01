import schema from 'reducers/schema';

import { MESSEGE_SET } from './constants';
import { IMessageState } from 'flux/types';

/**
 * Sets message
 */
export const set = (content: string) => ({ type: MESSEGE_SET, content });

const getDefaultState = (): IMessageState => schema.message;

export default (state: IMessageState = getDefaultState(), { type, content }): IMessageState => {
  switch (type) {
    case MESSEGE_SET:
      return {...state, content};
  }

  return state;
};
