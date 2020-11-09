import {
  RIVERSIDE_LEFT,
  ICollocationState,
  IMessageState,
  IGameState,
  ISettingsState,
} from 'flux/types';

export interface ISchema {
  readonly collocation: ICollocationState<string>;
  readonly message: IMessageState;
  readonly game: IGameState;
  readonly settings: ISettingsState;
}

const schema: ISchema = {
  collocation: {
    boat: [],
    left: [],
    right: [],
    boatPosition: RIVERSIDE_LEFT,
    isBoatInvalid: false,
  },
  message: {
    content: '',
    hidden: true,
  },
  game: {
    currentGame: 'game1',
    finished: false,
    list: [],
  },
  settings: {
    volume: 1,
  },
};

export default schema;
