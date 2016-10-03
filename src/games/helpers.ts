export const RIVERSIDE_LEFT: string = 'left';
export const RIVERSIDE_RIGHT: string = 'right';
export const BOAT: string = 'boat';

export interface ValidatorResult {
    success: boolean;
    message?: string;
    meta?: any;
}

export interface Game {
    validator(collocation: any, characterId: string): ValidatorResult;
    boatValidator(collocation: any): ValidatorResult;
    characters: any;
    collocation: any;
    title: string;
    description: string;
    rules: {
        beforeLanding: Array<{
            description: string;
            check(collocation: any, characterId: string, moveTo: string): boolean;
        }>;
        beforeDeparture: Array<{
            description: string;
            check(collocation: any): boolean;
        }>;
    };
}

const getCharacterDirection = (collocation: any, characterId: string): string => {
    for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT]) {
        if (collocation[item].includes(characterId)) {
            return item === BOAT ? collocation.boatPosition : BOAT;
        }
    }
}

export function validator(collocation: any, characterId: string): ValidatorResult {
    let moveTo: string = getCharacterDirection(collocation, characterId);

    for (let rule of this.rules.beforeLanding) {
        if (!rule.check(collocation, characterId, moveTo)) {
            return {
                success: false,
                message: rule.description
            }
        }
    }

    return {
        success: true
    };
};

export function boatValidator(collocation: any): ValidatorResult {
    for (let rule of this.rules.beforeDeparture) {
        if (!rule.check(collocation)) {
            return {
                success: false,
                message: rule.description
            }
        }
    }

    return {
        success: true
    };
}
