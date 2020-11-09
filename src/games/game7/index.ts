import characters from './characters';

import { RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT } from 'flux/types';

import { Game } from 'games/helpers';

const game = new Game(
  characters,
  {
    [BOAT]: [],
    [RIVERSIDE_LEFT]: characters.map(({ id }) => id),
    [RIVERSIDE_RIGHT]: [],
  },
  'Crossing 7',
  'It is necessary to get everyone across the river.',
  {
    beforeLanding: [
      {
        description: 'The boat can accommodate only 3 persons',
        check(collocation, _, moveTo): boolean {
          return moveTo !== BOAT || collocation.boat.length < 3;
        },
      },
    ],
    beforeDeparture: [
      {
        description: 'Driving the boat can only farmer',
        check(collocation): boolean {
          return collocation.boat.includes('farmer');
        },
      },
      {
        description: 'Do not leave a wolf and a sheep alone without the farmer',
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            const side = collocation[item];

            if (
              !side.includes('farmer') &&
              (side.includes('wolf1') || side.includes('wolf2')) &&
              side.includes('sheep')
            ) {
              return false;
            }
          }

          return true;
        },
      },
      {
        description: 'Do not leave a wolf and a dog alone without the farmer',
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            const side = collocation[item];

            if (
              !side.includes('farmer') &&
              (side.includes('wolf1') || side.includes('wolf2')) &&
              side.includes('dog')
            ) {
              return false;
            }
          }

          return true;
        },
      },
      {
        description: 'Do not leave a dog and a sheep alone without the farmer',
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            const side = collocation[item];

            if (!side.includes('farmer') && side.includes('dog') && side.includes('sheep')) {
              return false;
            }
          }

          return true;
        },
      },
      {
        description: 'Do not leave the sheep and cabbage alone without the farmer',
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            const side = collocation[item];

            if (!side.includes('farmer') && side.includes('cabbage') && side.includes('sheep')) {
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
