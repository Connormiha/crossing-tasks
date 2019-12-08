import {
    ICollocationState,
    ICharactersList, ICharacterBase,
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT,
    RIVERSIDE_LEFT_TYPE, RIVERSIDE_RIGHT_TYPE, BOAT_TYPE,
} from 'flux/types';

export type PositionCharacter = RIVERSIDE_LEFT_TYPE | RIVERSIDE_RIGHT_TYPE | BOAT_TYPE;

export const COLLOCATIONS_LIST: PositionCharacter[] = [RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT];

export type ValidatorResult = {
    success: false;
    message?: string;
    meta?: any;
} | {
    success: true;
}

export type ICollocation<T extends string> = Record<PositionCharacter, T[]>;

type ICharacterID<T> = T extends ICharacterBase<infer S> ? S : never;

export class Game<T extends ICharacterBase<S>, S extends string = ICharacterID<T>> {
    constructor(
        readonly characters: ICharactersList<T>,
        readonly collocation: ICollocation<S>,
        readonly title: string,
        readonly description: string,
        readonly rules: {
            beforeLanding: Array<{
                description: string;
                check(collocation: ICollocationState<S>, characterId?: S, moveTo?: PositionCharacter): boolean;
            }>;
            beforeDeparture: Array<{
                description: string;
                check(collocation: ICollocationState<S>): boolean;
            }>;
        }
    ) {};

    landingValidator(collocation: ICollocationState<S>, characterId: S): ValidatorResult {
        const moveTo = getCharacterDirection(collocation, characterId);
    
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
    
    depetureValidator(collocation: ICollocationState<S>): ValidatorResult {
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
}

const getCharacterDirection = <T extends string>(collocation: ICollocationState<T>, characterId: T): PositionCharacter => {
    for (const item of COLLOCATIONS_LIST) {
        if (collocation[item].includes(characterId)) {
            return item === BOAT ? collocation.boatPosition : BOAT;
        }
    }

    throw Error('Missed character');
};

