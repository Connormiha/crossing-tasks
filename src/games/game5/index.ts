import characters from './characters';

import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

import {
    Game, landingValidator, depetureValidator
} from 'games/helpers';

const game: Game = {
    title: 'Crossing 5',
    description: 'It is necessary to get everyone across the river.',
    rules: {
        beforeLanding: [
            {
                description: 'The boat can accommodate only two persons',
                check(collocation: any, characterId: string, moveTo: string): boolean {
                    return moveTo !== BOAT || collocation.boat.length < 2;
                }
            }
        ],
        beforeDeparture: [
            {
                description: 'The boat is empty',
                check(collocation: any): boolean {
                    return collocation.boat.length !== 0;
                }
            },
            {
                description: 'Only big monkey or human can drive the boat',
                check(collocation: any): boolean {
                    for (let character of collocation[BOAT]) {
                        if (character === 'gorilla' || characters[character].type === 'priest') {
                            return true;
                        }
                    }

                    return false;
                }
            },
            {
                description: 'Monkeys do not have to get numerical superiority in any riverside',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side: string[] = collocation[item],
                            priestsCount: number = 0,
                            monkeyCount: number = 0;

                        if (item !== collocation.boatPosition) {
                            side = side.concat(collocation[BOAT]);
                        }

                        for (let character of side) {
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
    landingValidator,
    depetureValidator,
    characters,
    collocation: {
        [BOAT]: [],
        [RIVERSIDE_LEFT]: Object.keys(characters),
        [RIVERSIDE_RIGHT]: []
    }
};

export default game;
