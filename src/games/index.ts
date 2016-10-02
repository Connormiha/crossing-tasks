import characters from 'characters';

export const RIVERSIDE_LEFT: string = 'left';
export const RIVERSIDE_RIGHT: string = 'right';
export const BOAT: string = 'boat';

export enum Collocations {
    BOAT = 'left',
    LEFT = 'boat',
    RIGHT = 'right'
}

interface ValidatorResult {
    success: boolean;
    message?: string;
    meta?: any;
}

interface Game {
    validator(collocation: any, characterId: string): ValidatorResult;
    boatValidator(collocation: any): ValidatorResult;
    characters: any;
    collocation: any;
}

const getCharacterDirection = (collocation: any, characterId: string): string => {
    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
        if (collocation[item].includes(characterId)) {
            return item === BOAT ? collocation.boatPosition : BOAT;
        }
    }
}

const game1: Game = {
    validator(collocation: any, characterId: string): ValidatorResult {
        let moveTo: string = getCharacterDirection(collocation, characterId);

        if (moveTo === BOAT && collocation.boat.length === 2) {
            return {
                success: false,
                message: 'Лодка полная'
            };
        }

        return {
            success: true
        };
    },
    boatValidator(collocation: any): ValidatorResult {
        if (!collocation.boat.includes('farmer')) {
            return {
                success: false,
                message: 'Управлять лодкой может только фермер'
            };
        }

        for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            let side = collocation[item];

            if (!side.includes('farmer')) {
                if (side.includes('sheep')) {
                    if (side.includes('wolf')) {
                        return {
                            success: false,
                            message: 'Волк ест овцу'
                        };
                    }

                    if (side.includes('cabbage')) {
                        return {
                            success: false,
                            message: 'Овца ест капусту'
                        };
                    }
                }

            }
        }

        return {
            success: true
        };
    },
    characters,
    collocation: {
        boat: [],
        [RIVERSIDE_LEFT]: Object.keys(characters),
        [RIVERSIDE_RIGHT]: []
    }
};

export default game1;
