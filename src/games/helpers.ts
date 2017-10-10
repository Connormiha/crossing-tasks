import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

export type PositionCharacter = 'left' | 'right' | 'boat';

export const COLLOCATIONS_LIST: string[] = [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT];

export interface ValidatorResult {
    success: boolean;
    message?: string;
    meta?: any;
}

export interface Game {
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
    landingValidator(collocation: any, characterId: string): ValidatorResult;
    depetureValidator(collocation: any): ValidatorResult;
}

const getCharacterDirection = (collocation: any, characterId: string): string => {
    for (let item of COLLOCATIONS_LIST) {
        if (collocation[item].includes(characterId)) {
            return item === BOAT ? collocation.boatPosition : BOAT;
        }
    }

    return '';
};

export function landingValidator(collocation: any, characterId: string): ValidatorResult {
    let moveTo: string = getCharacterDirection(collocation, characterId);

    for (let rule of this.rules.beforeLanding) {
        if (!rule.check(collocation, characterId, moveTo)) {
            return {
                success: false,
                message: rule.description
            };
        }
    }

    return {
        success: true
    };
}

export function depetureValidator(collocation: any): ValidatorResult {
    for (let rule of this.rules.beforeDeparture) {
        if (!rule.check(collocation)) {
            return {
                success: false,
                message: rule.description
            };
        }
    }

    return {
        success: true
    };
}
