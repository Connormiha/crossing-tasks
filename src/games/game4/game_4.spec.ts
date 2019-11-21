import games from 'games';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';
import {
    Game
} from 'games/helpers';

const game: Game = games.game4;

describe('Game_4', () => {
    let result,
        boat: string[];

    it('shouldn\'t move empty boat', () => {
        result = game.depetureValidator(game.collocation);

        expect(result.success).toBe(false);
    });

    it('should move boat only with adult', () => {
        for (const item of Object.keys(game.characters)) {
            if (item === 'policeman') {
                continue;
            }

            result = game.depetureValidator({
                [BOAT]: [item],
                [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter((_item) => _item !== item),
                [RIVERSIDE_RIGHT]: []
            });

            expect(result.success).toBe(game.characters[item].adult);
        }
    });

    it('shouldn\'t criminal stay with citizens without policeman', () => {
        boat = ['policeman'];

        result = game.depetureValidator({
            [BOAT]: boat,
            [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter((_item) => _item !== 'policeman'),
            [RIVERSIDE_RIGHT]: []
        });

        expect(result.success).toBe(false);
    });
});
