import React from 'react';

import { storiesOf } from '@storybook/react';
import PagePlayPure from 'components/page/Play/index.pure';
import { RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT } from 'flux/types';
import noop from 'lodash/noop';
import games from 'games';

const createParams = (gameName: string) => {
  return {
    game: {
      finished: false,
      currentGame: gameName,
      list: [],
    },
    message: {
      content: '',
      hidden: true,
    },
    match: {
      params: {
        id: '',
      },
    },
    settings: {
      volume: 1,
    },
    collocation: {
      [BOAT]: [],
      [RIVERSIDE_LEFT]: Object.keys(games[gameName].characters),
      [RIVERSIDE_RIGHT]: [],
      boatPosition: RIVERSIDE_LEFT,
      isBoatInvalid: false,
    },
    onMoveCharacter: noop,
    onBoatMoveEnd: noop,
    onFinishGame: noop,
    onStartGame: noop,
    onMoveBoat: noop,
    onChangeVolume: noop,
    onToggleInvalidBoat: noop,
  };
};

const stories = storiesOf('Page play', module);

for (let i = 1; i < 8; i++) {
  stories.add(`Game ${i}`, () => {
    return <PagePlayPure {...createParams(`game_${i}`)} />;
  });
}
