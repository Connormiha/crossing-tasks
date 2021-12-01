import characters from './characters';

import { RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT } from 'flux/types';
import { ICharacterIdGame3, ICharacterFamily } from './types';

import { Game } from 'games/helpers';

const isWomanWithOtherMenWithuotHasband = (side: ICharacterIdGame3[]): boolean => {
  const mens: ICharacterFamily[] = [];
  const women: ICharacterFamily[] = [];

  for (const character of side) {
    const item = characters.find(({id}) => id === character)!;

    if (item.sex === 'female') {
      women.push(item.family);
    } else {
      mens.push(item.family);
    }
  }

  if (mens.length) {
    for (const woman of women) {
      if (!mens.includes(woman)) {
        return false;
      }
    }
  }

  return true;
};

export default new Game(
  characters,
  {
    [BOAT]: [],
    [RIVERSIDE_LEFT]: characters.map(({ id }) => id),
    [RIVERSIDE_RIGHT]: [],
  },
  'Crossing 3',
  'No woman with other men without her hasband',
  {
    beforeLanding: [
      {
        description: 'The boat can accommodate only two persons',
        check(collocation, _, moveTo): boolean {
          return moveTo !== BOAT || collocation.boat.length < 2;
        },
      },
    ],
    beforeDeparture: [
      {
        description: 'The boat is empty',
        check(collocation): boolean {
          return collocation.boat.length !== 0;
        },
      },
      {
        description: 'A woman can not be with a man without a husband in boat',
        check(collocation): boolean {
          return isWomanWithOtherMenWithuotHasband(collocation[BOAT]);
        },
      },

      {
        description: 'A woman can not be with a man without a husband in riverside',
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            const side: ICharacterIdGame3[] = collocation[item];

            if (item !== collocation.boatPosition) {
              side.push(...collocation[BOAT]);
            }

            if (!isWomanWithOtherMenWithuotHasband(side)) {
              return false;
            }
          }

          return true;
        },
      },
    ],
  },
);
