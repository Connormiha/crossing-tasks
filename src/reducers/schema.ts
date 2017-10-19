import {
    RIVERSIDE_LEFT,
    ICollocationState, IMessageState, IGameState, ISettingsState,
} from 'flux/types';

interface ISchema {
    collocation: ICollocationState;
    message: IMessageState;
    game: IGameState;
    settings: ISettingsState;
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
        hidden: true
    },
    game: {
        currentGame: 'game_1',
        finished: false,
        list: []
    },
    settings: {
        volume: 1,
    },
};

export default schema;
