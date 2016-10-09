import games from 'games';
import {
    Game
} from 'games/helpers';

const game: Game = games.game_3;

describe('Game_3', () => {
    let result;

    it('shouldn\'t move empty boat', () => {
        result = game.depetureValidator(game.collocation);

        expect(result.success).toBe(false);
    });

});
