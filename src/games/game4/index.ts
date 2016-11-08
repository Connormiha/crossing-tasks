import characters from './characters';

import {
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT,
    Game, landingValidator, depetureValidator
} from 'games/helpers';

const game: Game = {
    title: 'Crossing 4',
    description: '@todo',
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
                description: 'Driving the boat can only adult',
                check(collocation: any): boolean {
                    for (let character of collocation.boat) {
                        if (characters[character].adult) {
                            return true;
                        }
                    }

                    return false;
                }
            },
            {
                description: 'The criminal shoudn\'t stay with citizens in boat',
                check(collocation: any): boolean {
                    if (collocation.boat.length === 2 &&
                        !collocation.boat.includes('policeman') &&
                        collocation.boat.includes('criminal')
                    ) {
                        return false;
                    }

                    return true;
                }
            },
            {
                description: 'The criminal shoudn\'t stay with citizens in riverside',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
                        let side = collocation[item];

                        if (side.includes('criminal') &&
                            !side.includes('policeman') &&
                            side.length > 1
                        ) {
                            return false;
                        }
                    }

                    return true;
                }
            },
            {
                description: 'Boys shoudn\'t stay with mother in riverside or boat alone without father',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
                        let side = collocation[item];

                        if (item !== collocation.boatPosition && collocation.boatPosition !== BOAT) {
                            side = side.concat(collocation[BOAT]);
                        }

                        if (side.includes('woman_black') &&
                            !side.includes('men_black') &&
                            (side.includes('boy_yellow') || side.includes('boy_red'))
                        ) {
                            return false;
                        }
                    }

                    return true;
                }
            },
            {
                description: 'Girls shoudn\'t stay with father in riverside or boat alone without mother',
                check(collocation: any): boolean {
                    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
                        let side = collocation[item];

                        if (item !== collocation.boatPosition && collocation.boatPosition !== BOAT) {
                            side = side.concat(collocation[BOAT]);
                        }

                        if (side.includes('men_black') &&
                            !side.includes('woman_black') &&
                            (side.includes('girl_yellow') || side.includes('girl_red'))
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
