import games from 'games';

const game = games.game2;

describe('Game_2', () => {
    let result;

    it('shouldn\'t move empty boat', () => {
        result = game.depetureValidator({
            ...game.collocation,
            isBoatInvalid: false,
            boatPosition: 'left'
        });

        expect(result.success).toBe(false);
    });
});
