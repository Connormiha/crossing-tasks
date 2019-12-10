import games from 'games';
import {ICharacterIdGame1} from './types';
import {
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT,
} from 'flux/types';
import {getLeftRightCollocation} from 'helpers/tests';

const game = games.game1;

describe('Game_1', () => {
    let result;

    it('shouldn\'t move empty boat', () => {
        result = game.depetureValidator({
            ...game.collocation,
            isBoatInvalid: false,
            boatPosition: 'left'
        });

        expect(result.success).toBe(false);
    });

    it('shouldn\'t move boat without farmer', () => {
        for (const item of ['sheep', 'coat', 'cabbage', 'wolf'] as ICharacterIdGame1[]) {
            result = game.depetureValidator({
                [BOAT]: [item],
                [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter((name) => name !== item),
                [RIVERSIDE_RIGHT]: [],
                isBoatInvalid: false,
                boatPosition: 'left'
            });

            expect(result.success).toBe(false);
        }
    });

    it('shouldn\'t leave sheep with wolf alone without farmer', () => {
        for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT] as any) {
            result = game.depetureValidator({
                [BOAT]: ['farmer', 'cabbage'],
                ...getLeftRightCollocation(game, item, (name) => name !== 'farmer' && name !== 'cabbage'),
                isBoatInvalid: false,
                boatPosition: item
            });

            expect(result.success).toBe(false);
        }
    });

    it('shouldn\'t leave sheep with cabbage alone without farmer', () => {
        for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            result = game.depetureValidator({
                [BOAT]: ['farmer', 'wolf'],
                ...getLeftRightCollocation(game, item, (name) => name !== 'farmer' && name !== 'wolf'),
                isBoatInvalid: false,
                boatPosition: item
            });

            expect(result.success).toBe(false);
        }
    });

    it('shouldn\'t push on boat more, than 2 persons', () => {
        result = game.landingValidator({
            [BOAT]: ['farmer', 'wolf'],
            [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter((name) => name !== 'farmer' && name !== 'wolf'),
            [RIVERSIDE_RIGHT]: [],
            isBoatInvalid: false,
            boatPosition: 'left'
        }, 'sheep');

        expect(result.success).toBe(false);
    });

    it('should move boat with farmer and sheep', () => {
        for (const item of [RIVERSIDE_LEFT, RIVERSIDE_RIGHT]) {
            result = game.depetureValidator({
                [BOAT]: ['farmer', 'sheep'],
                ...getLeftRightCollocation(game, item, (name) => name !== 'farmer' && name !== 'sheep'),
                isBoatInvalid: false,
                boatPosition: 'left'
            });
        }

        expect(result.success).toBe(true);
    });

    it('should move boat with boat:[farmer, wolf], left[sheep], right[cabbage]', () => {
        result = game.depetureValidator({
            [BOAT]: ['farmer', 'wolf'],
            [RIVERSIDE_LEFT]: ['sheep'],
            [RIVERSIDE_RIGHT]: ['cabbage'],
            isBoatInvalid: false,
            boatPosition: 'left'
        });

        expect(result.success).toBe(true);
    });

    it('should move boat with boat:[farmer, cabbage], left[sheep], right[wolf]', () => {
        result = game.depetureValidator({
            [BOAT]: ['farmer', 'cabbage'],
            [RIVERSIDE_LEFT]: ['sheep'],
            [RIVERSIDE_RIGHT]: ['wolf'],
            isBoatInvalid: false,
            boatPosition: 'left'
        });

        expect(result.success).toBe(true);
    });
});
