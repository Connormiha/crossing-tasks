import characters from './characters';

import {
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT, ValidatorResult,
    Game, validator, boatValidator
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
                description: 'Savages do not have to get numerical superiority in boat',
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
                description: 'Savages do not have to get numerical superiority in any riverside',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side = collocation[item],
                            mens = [],
                            womans = [];

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
    validator,
    boatValidator,
    characters,
    collocation: {
        [BOAT]: [],
        [RIVERSIDE_LEFT]: Object.keys(characters),
        [RIVERSIDE_RIGHT]: []
    }
};

export default game;
