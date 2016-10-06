import {game_1} from 'games';
import {
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT
} from 'games/helpers';

describe('Games', () => {
    describe('Game_1', () => {
        it('should not move empty boat', () => {
            let result = game_1.boatValidator(game_1.collocation);

            expect(result.success).toBe(false);
        });
    });
});
