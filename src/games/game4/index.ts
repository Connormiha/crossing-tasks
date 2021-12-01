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
  'Crossing 4',
  '@todo',
  {
    beforeLanding: [
      {
        description: 'The boat can accommodate only two persons',
        check(collocation, characterId, moveTo): boolean {
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
        description: 'Driving the boat can only adult',
        check(collocation): boolean {
          for (const character of collocation.boat) {
            if (characters.some(({ id, adult }) => id === character && adult)) {
              return true;
            }
          }

          return false;
        },
      },
      {
        description: "The criminal shoudn't stay with citizens in boat",
        check(collocation): boolean {
          if (
            collocation.boat.length === 2 &&
            !collocation.boat.includes('policeman') &&
            collocation.boat.includes('criminal')
          ) {
            return false;
          }

          return true;
        },
      },
      {
        description: "The criminal shoudn't stay with citizens in riverside",
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            const side = collocation[item];

            if (side.includes('criminal') && !side.includes('policeman') && side.length > 1) {
              return false;
            }
          }

          return true;
        },
      },
      {
        description: "Boys shoudn't stay with mother in riverside or boat alone without father",
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
            let side = collocation[item];

            if (item !== collocation.boatPosition) {
              side = side.concat(collocation[BOAT]);
            }

            if (
              side.includes('woman_black') &&
              !side.includes('men_black') &&
              (side.includes('boy_yellow') || side.includes('boy_red'))
            ) {
              return false;
            }
          }

          return true;
        },
      },
      {
        description: "Girls shoudn't stay with father in riverside or boat alone without mother",
        check(collocation): boolean {
          for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
            let side = collocation[item];

            if (item !== collocation.boatPosition) {
              side = side.concat(collocation[BOAT]);
            }

            if (
              side.includes('men_black') &&
              !side.includes('woman_black') &&
              (side.includes('girl_yellow') || side.includes('girl_red'))
            ) {
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
