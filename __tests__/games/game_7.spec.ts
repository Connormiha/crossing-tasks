import games from 'games';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';
import {
    Game
} from 'games/helpers';

const game: Game = games.game_7;

describe('Game_7', () => {
    let result;

    it('shouldn\'t move empty boat', () => {
        result = game.depetureValidator(game.collocation);

        expect(result.success).toBe(false);
    });

    it('shouldn\'t move boat without farmer', () => {
        for (let item of ['sheep', 'coat', 'cabbage', 'wolf1', 'wolf2', 'dog']) {
            result = game.depetureValidator({
                [BOAT]: [item],
                [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter((name) => name !== item),
                [RIVERSIDE_RIGHT]: []
            });

            expect(result.success).toBe(false);
        }
    });

    it('shouldn\'t leave sheep with wolf alone without farmer', () => {
        for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            result = game.depetureValidator({
                [BOAT]: ['farmer', 'cabbage'],
                [item]: game.collocation[RIVERSIDE_LEFT].filter((name) => name !== 'farmer' && name !== 'cabbage'),
                [item === RIVERSIDE_RIGHT ? RIVERSIDE_LEFT : RIVERSIDE_RIGHT]: []
            });

            expect(result.success).toBe(false);
        }
    });

    it('shouldn\'t leave sheep with cabbage alone without farmer', () => {
        for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            result = game.depetureValidator({
                [BOAT]: ['farmer', 'wolf1'],
                [item]: game.collocation[RIVERSIDE_LEFT].filter((name) => name !== 'farmer' && name !== 'wolf'),
                [item === RIVERSIDE_RIGHT ? RIVERSIDE_LEFT : RIVERSIDE_RIGHT]: []
            });

            expect(result.success).toBe(false);
        }
    });

    it('shouldn\'t push on boat more, than 3 persons', () => {
        result = game.landingValidator({
            [BOAT]: ['farmer', 'wolf1', 'wolf2'],
            [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter((name) => name !== 'farmer' || name !== 'wolf'),
            [RIVERSIDE_RIGHT]: []
        }, 'sheep', BOAT);

        expect(result.success).toBe(false);
    });

    it('should move boat with farmer and sheep', () => {
        for (let item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            result = game.depetureValidator({
                [BOAT]: ['farmer', 'sheep'],
                [item]: game.collocation[RIVERSIDE_LEFT].filter((name) => name !== 'farmer' || name !== 'sheep'),
                [item === RIVERSIDE_RIGHT ? RIVERSIDE_LEFT : RIVERSIDE_RIGHT]: []
            });
        }

        expect(result.success).toBe(true);
    });

    it('should move boat with boat:[farmer, wolf], left[sheep], right[cabbage]', () => {
        result = game.depetureValidator({
            [BOAT]: ['farmer', 'wolf'],
            [RIVERSIDE_LEFT]: ['sheep'],
            [RIVERSIDE_RIGHT]: ['cabbage']
        });

        expect(result.success).toBe(true);
    });

    it('should move boat with boat:[farmer, cabbage], left[sheep], right[wolf]', () => {
        result = game.depetureValidator({
            [BOAT]: ['farmer', 'cabbage'],
            [RIVERSIDE_LEFT]: ['sheep'],
            [RIVERSIDE_RIGHT]: ['wolf']
        });

        expect(result.success).toBe(true);
    });
});
