import characters from './characters';

import {
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT,
    Game, landingValidator, depetureValidator
} from 'games/helpers';

const game: Game = {
    title: 'Crossing 2',
    description: 'No woman with other men without her hasband',
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
                        womans: string[] = [];

                    for (let character of side) {
                        if (characters[character].sex === 'female') {
                            womans.push(characters[character].family);
                        } else {
                            mens.push(characters[character].family);
                        }
                    }

                    if (mens.length) {
                        for (let woman of womans) {
                            if (!mens.includes(woman)) {
                                return false;
                            }
                        }
                    }

                    return true;
                }
            },

            {
                description: 'A woman can not be with a man without a husband in riverside',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side: string[] = collocation[item],
                            mens: string[] = [],
                            womans: string[] = [];

                        if (item !== collocation.boatPosition) {
                            side = side.concat(collocation[BOAT]);
                        }

                        for (let character of side) {
                            if (characters[character].sex === 'female') {
                                womans.push(characters[character].family);
                            } else {
                                mens.push(characters[character].family);
                            }
                        }

                        if (mens.length) {
                            for (let woman of womans) {
                                if (!mens.includes(woman)) {
                                    return false;
                                }
                            }
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
