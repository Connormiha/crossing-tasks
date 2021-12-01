import schema from 'reducers/schema';
import { RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT, ICollocationState } from 'flux/types';

import {
  COLLOCATION_MOVE_CHARACTER,
  COLLOCATION_MOVE_BOAT,
  COLLOCATION_INIT,
  COLLOCATION_TOGGLE_BOAT_INVALID,
} from './constants';

/**
 * Moves character to other position (form/to boat)
 */
export const moveCharacter = (id: string) => ({ type: COLLOCATION_MOVE_CHARACTER, id });

/**
 * Move boat to other riverside
 */
export const moveBoat = () => ({ type: COLLOCATION_MOVE_BOAT });

/**
 * Move boat to other riverside
 */
export const toggleBoatInvalid = (isBoatInvalid: boolean) => ({
  type: COLLOCATION_TOGGLE_BOAT_INVALID,
  isBoatInvalid,
});

/**
 * Init new collocation
 */
export const init = (collocation: any) => ({ type: COLLOCATION_INIT, collocation });

const getDefaultState = (): ICollocationState<string> => schema.collocation;

export default (
  state: ICollocationState<string> = getDefaultState(),
  action,
): ICollocationState => {
  const { type, collocation, isBoatInvalid, id } = action;
  switch (type) {
    case COLLOCATION_MOVE_CHARACTER: {
      for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
        const index: number = state[item].indexOf(id);

        if (index !== -1) {
          const moveTo = item === BOAT ? state.boatPosition : BOAT;

          return {
            ...state,
            [item]: Object.freeze([...state[item].slice(0, index), ...state[item].slice(index + 1)]),
            [moveTo]: Object.freeze(state[moveTo].concat(id)),
          };
        }
      }

      return state;
    }

    case COLLOCATION_MOVE_BOAT: {
      return {
        ...state,
        boatPosition: state.boatPosition === RIVERSIDE_LEFT ? RIVERSIDE_RIGHT : RIVERSIDE_LEFT
      };
    }

    case COLLOCATION_TOGGLE_BOAT_INVALID: {
      return {
        ...state,
        isBoatInvalid,
      };
    }

    case COLLOCATION_INIT: {
      return {
        ...state,
        ...collocation,
        boatPosition: RIVERSIDE_LEFT,
      };
    }
  }

  return state;
};
