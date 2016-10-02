import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT} from 'games';

const schema = {
    collocation: {
        boat: [],
        [RIVERSIDE_LEFT]: [],
        [RIVERSIDE_RIGHT]: [],
        boatPosition: RIVERSIDE_LEFT
    },
    message: {
        content: '',
        hidden: true
    }
};

export default schema;
