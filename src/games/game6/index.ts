import characters from './characters';

import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

import {
    Game, landingValidator, depetureValidator
} from 'games/helpers';

const game: Game = {
    title: 'Crossing 3',
    description: 'No woman with other men without her hasband (or other woman)',
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
                description: 'A woman can not be with a man without a husband in boat',
                check(collocation: any): boolean {
                    let side = collocation[BOAT],
                        mens: string[] = [],
                        women: string[] = [];

                    for (let character of side) {
                        if (characters[character].sex === 'female') {
                            women.push(characters[character].family);
                        } else {
                            mens.push(characters[character].family);
                        }
                    }

                    if (mens.length) {
                        for (let woman of women) {
                            if (!mens.includes(woman)) {
                                return false;
                            }
                        }
                    }

                    return true;
                }
            },

            {
                description: 'A woman can not be with a men without a husband or other woman in riverside',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side: string[] = collocation[item],
                            mens: string[] = [],
                            women: string[] = [];

                        if (item !== collocation.boatPosition) {
                            side = side.concat(collocation[BOAT]);
                        }

                        for (let character of side) {
                            if (characters[character].sex === 'female') {
                                women.push(characters[character].family);
                            } else {
                                mens.push(characters[character].family);
                            }
                        }

                        if (mens.length &&
                            women.length === 1 &&
                            !mens.includes(women[0])
                        ) {
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
