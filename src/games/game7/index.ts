import characters from './characters';

import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

import {
    Game, landingValidator, depetureValidator
} from 'games/helpers';

const game: Game = {
    title: 'Crossing 7',
    description: 'It is necessary to get everyone across the river.',
    rules: {
        beforeLanding: [
            {
                description: 'The boat can accommodate only 3 persons',
                check(collocation: any, characterId: string, moveTo: string): boolean {
                    return moveTo !== BOAT || collocation.boat.length < 3;
                }
            }
        ],
        beforeDeparture: [
            {
                description: 'Driving the boat can only farmer',
                check(collocation: any): boolean {
                    return collocation.boat.includes('farmer');
                }
            },
            {
                description: 'Do not leave a wolf and a sheep alone without the farmer',
                check(collocation: any): boolean {
                    for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        const side = collocation[item];

                        if (!side.includes('farmer') && (side.includes('wolf1') || side.includes('wolf2')) && side.includes('sheep')) {
                            return false;
                        }
                    }

                    return true;
                }
            },
            {
                description: 'Do not leave a wolf and a dog alone without the farmer',
                check(collocation: any): boolean {
                    for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        const side = collocation[item];

                        if (!side.includes('farmer') && (side.includes('wolf1') || side.includes('wolf2')) && side.includes('dog')) {
                            return false;
                        }
                    }

                    return true;
                }
            },
            {
                description: 'Do not leave a dog and a sheep alone without the farmer',
                check(collocation: any): boolean {
                    for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        const side = collocation[item];

                        if (!side.includes('farmer') && side.includes('dog') && side.includes('sheep')) {
                            return false;
                        }
                    }

                    return true;
                }
            },
            {
                description: 'Do not leave the sheep and cabbage alone without the farmer',
                check(collocation: any): boolean {
                    for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        const side = collocation[item];

                        if (!side.includes('farmer') && side.includes('cabbage') && side.includes('sheep')) {
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
