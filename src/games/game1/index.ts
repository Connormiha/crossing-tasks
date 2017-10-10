import characters from './characters';

import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

import {
    Game, landingValidator, depetureValidator
} from 'games/helpers';

const game: Game = {
    title: 'Crossing 1',
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
                description: 'Driving the boat can only farmer',
                check(collocation: any): boolean {
                    return collocation.boat.includes('farmer');
                }
            },
            {
                description: 'Do not leave a wolf and a sheep farmer without one',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side = collocation[item];

                        if (!side.includes('farmer') && side.includes('wolf') && side.includes('sheep')) {
                            return false;
                        }
                    }

                    return true;
                }
            },
            {
                description: 'Do not leave the sheep and cabbage alone without the farmer',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side = collocation[item];

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
