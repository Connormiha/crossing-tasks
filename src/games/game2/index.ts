import characters from './characters';

import { RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT } from 'flux/types';

import { Game } from 'games/helpers';

export default new Game(
  characters,
  {
    [BOAT]: [],
    [RIVERSIDE_LEFT]: characters.map(({ id }) => id),
    [RIVERSIDE_RIGHT]: [],
  },
  'Crossing 2',
  'It is necessary to get everyone across the river.',
  {
    beforeLanding: [
      {
        description: 'The boat can accommodate only two persons',
        check(collocation): boolean {
          return collocation.boat.length < 2;
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
        description: 'Savages do not have to get numerical superiority in any riverside',
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            let side = collocation[item],
              priestsCount = 0,
              cavemansCount = 0;

            if (item !== collocation.boatPosition) {
              side = side.concat(collocation[BOAT]);
            }

            for (const character of side) {
              if (characters[character].type === 'priest') {
                priestsCount++;
              } else {
                cavemansCount++;
              }
            }

            if (priestsCount && priestsCount < cavemansCount) {
              return false;
            }
          }

          return true;
        },
      },
    ],
  },
);
