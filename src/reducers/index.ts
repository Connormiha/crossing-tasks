import {combineReducers} from 'redux';
import collocation from 'flux/collocation';
import message from 'flux/message';
import game from 'flux/game';

export default combineReducers({
    collocation,
    message,
    game
});
