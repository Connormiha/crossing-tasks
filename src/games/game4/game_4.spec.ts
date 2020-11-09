import games from 'games';
import { ICharacterIdGame4 } from './types';
import { RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT } from 'flux/types';

const game = games.game4;

describe('Game_4', () => {
  let result;

  it("shouldn't move empty boat", () => {
    result = game.depetureValidator({
      ...game.collocation,
      isBoatInvalid: false,
      boatPosition: 'left',
    });

    expect(result.success).toBe(false);
  });

  it('should move boat only with adult', () => {
    for (const item of game.characters.map(({ id }) => id) as ICharacterIdGame4[]) {
      if (item === 'policeman') {
        continue;
      }

      result = game.depetureValidator({
        [BOAT]: [item],
        [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter((_item) => _item !== item),
        [RIVERSIDE_RIGHT]: [],
        isBoatInvalid: false,
        boatPosition: 'left',
      });

      expect(result.success).toBe(game.characters[item].adult);
    }
  });

  it("shouldn't criminal stay with citizens without policeman", () => {
    result = game.depetureValidator({
      [BOAT]: ['policeman'],
      [RIVERSIDE_LEFT]: game.collocation[RIVERSIDE_LEFT].filter((_item) => _item !== 'policeman'),
      [RIVERSIDE_RIGHT]: [],
      isBoatInvalid: false,
      boatPosition: 'left',
    });

    expect(result.success).toBe(false);
  });
});
