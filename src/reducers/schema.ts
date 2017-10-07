import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'games';

const schema = {
    collocation: {
        [BOAT]: [],
        [RIVERSIDE_LEFT]: [],
        [RIVERSIDE_RIGHT]: [],
        boatPosition: RIVERSIDE_LEFT
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
        volume: '1',
    },
};

export default schema;
