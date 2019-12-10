import {Game} from 'games/helpers';
import {
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, ICharacterBase,
} from 'flux/types';

type ICharacterID<T> = T extends ICharacterBase<infer S> ? S : never;

export const getLeftRightCollocation = <T extends ICharacterBase<S>, S extends string = ICharacterID<T>>(
    game: Game<T, S>,
    side: typeof RIVERSIDE_LEFT | typeof RIVERSIDE_RIGHT,
    filter: (name: string) => boolean,
): Record<typeof RIVERSIDE_LEFT | typeof RIVERSIDE_RIGHT, S[]> => {
    if (side === RIVERSIDE_LEFT) {
        return {
            [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter(filter),
            [RIVERSIDE_RIGHT]: [],
        }
    }

    return {
        [RIVERSIDE_RIGHT]: game.collocation[RIVERSIDE_LEFT].filter(filter),
        [RIVERSIDE_LEFT]: [],
    };
}