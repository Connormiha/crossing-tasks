import characters from './characters';
import { ICharacterIdGame6 } from './types';

import { RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT } from 'flux/types';

import { Game } from 'games/helpers';

const game = new Game(
  characters,
  {
    [BOAT]: [],
    [RIVERSIDE_LEFT]: characters.map(({ id }) => id),
    [RIVERSIDE_RIGHT]: [],
  },
  'Crossing 3',
  'No woman with other men without her hasband (or other woman)',
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
          const side = collocation[BOAT],
            mens: string[] = [],
            women: string[] = [];

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
        },
      },

      {
        description: 'A woman can not be with a men without a husband or other woman in riverside',
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            const side: ICharacterIdGame6[] = collocation[item];
            const mens: ICharacterIdGame6[] = [];
            const women: ICharacterIdGame6[] = [];

            if (item !== collocation.boatPosition) {
              side.push(...collocation[BOAT]);
            }

            for (const character of side) {
              const item = characters.find(({id}) => id === character)!;

              if (item.sex === 'female') {
                women.push(item.id);
              } else {
                mens.push(item.id);
              }
            }

            if (mens.length && women.length === 1 && !mens.includes(women[0])) {
              return false;
            }
          }

          return true;
        },
      },
    ],
  },
);

export default game;
