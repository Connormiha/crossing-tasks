import {
    ICollocationState,
    ICharactersList, ICharacterBase,
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT,
    RIVERSIDE_LEFT_TYPE, RIVERSIDE_RIGHT_TYPE, BOAT_TYPE,
} from 'flux/types';

export type PositionCharacter = RIVERSIDE_LEFT_TYPE | RIVERSIDE_RIGHT_TYPE | BOAT_TYPE;

export const COLLOCATIONS_LIST: PositionCharacter[] = [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT];

export interface ValidatorResult {
    success: boolean;
    message?: string;
    meta?: any;
}

export type ICollocation = Record<PositionCharacter, any[]>;

export interface Game<T> {
    characters: ICharactersList<T>;
    collocation: ICollocation;
    title: string;
    description: string;
    rules: {
        beforeLanding: Array<{
            description: string;
            check(collocation: ICollocationState, characterId: string, moveTo: string): boolean;
        }>;
        beforeDeparture: Array<{
            description: string;
            check(collocation: ICollocationState): boolean;
        }>;
    };
    landingValidator(collocation: ICollocationState, characterId: string): ValidatorResult;
    depetureValidator(collocation: ICollocationState): ValidatorResult;
}

const getCharacterDirection = (collocation: ICollocationState, characterId: string): string => {
    for (const item of COLLOCATIONS_LIST) {
        if (collocation[item].includes(characterId)) {
            return item === BOAT ? collocation.boatPosition : BOAT;
        }
    }

    return '';
};

export function landingValidator(this: Game, collocation: ICollocationState, characterId: string): ValidatorResult {
    const moveTo: string = getCharacterDirection(collocation, characterId);

    for (const rule of this.rules.beforeLanding) {
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
    for (const rule of this.rules.beforeDeparture) {
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
