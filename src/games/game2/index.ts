import characters from './characters';

import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

import {
    Game, landingValidator, depetureValidator
} from 'games/helpers';

const game: Game = {
    title: 'Crossing 2',
    description: 'It is necessary to get everyone across the river.',
    rules: {
        beforeLanding: [
            {
                description: 'The boat can accommodate only two persons',
                check(collocation: any, characterId: string, moveTo: string): boolean {
                    return collocation.boat.length < 2;
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
                description: 'Savages do not have to get numerical superiority in any riverside',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side: string[] = collocation[item],
                            priestsCount: number = 0,
                            cavemansCount: number = 0;

                        if (item !== collocation.boatPosition) {
                            side = side.concat(collocation[BOAT]);
                        }

                        for (let character of side) {
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
