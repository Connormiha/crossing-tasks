import characters from './characters';

import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

import {
    Game,
} from 'games/helpers';

const game = new Game(
    characters,
    {
        [BOAT]: [],
        [RIVERSIDE_LEFT]: characters.map(({id}) => id),
        [RIVERSIDE_RIGHT]: []
    },
    'Crossing 5',
    'It is necessary to get everyone across the river.',
    {
        beforeLanding: [
            {
                description: 'The boat can accommodate only two persons',
                check(collocation, _, moveTo): boolean {
                    return moveTo !== BOAT || collocation.boat.length < 2;
                }
            }
        ],
        beforeDeparture: [
            {
                description: 'The boat is empty',
                check(collocation): boolean {
                    return collocation.boat.length !== 0;
                }
            },
            {
                description: 'Only big monkey or human can drive the boat',
                check(collocation): boolean {
                    for (const character of collocation[BOAT]) {
                        if (character === 'gorilla' || characters[character].type === 'priest') {
                            return true;
                        }
                    }

                    return false;
                }
            },
            {
                description: 'Monkeys do not have to get numerical superiority in any riverside',
                check(collocation): boolean {
                    for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side: string[] = collocation[item],
                            priestsCount = 0,
                            monkeyCount = 0;

                        if (item !== collocation.boatPosition) {
                            side = side.concat(collocation[BOAT]);
                        }

                        for (const character of side) {
                            if (characters[character].type === 'priest') {
                                priestsCount++;
                            } else {
                                monkeyCount++;
                            }
                        }

                        if (priestsCount && priestsCount < monkeyCount) {
                            return false;
                        }
                    }

                    return true;
                }
            }
        ]
    },
);

export default game;
