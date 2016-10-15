import {connect} from 'react-redux';
import {batchActions} from 'redux-batched-actions';
import * as collocationActions from 'flux/collocation';
import * as messageActions from 'flux/message';
import * as gameActions from 'flux/game';
import PagePlayPure from './index.pure';

import games from 'games';

export default connect(
    ({collocation, message, game}) =>
        ({collocation, message, game}),
    (dispatch) => {
        return {
            onStartGame(id: string) {
                dispatch(batchActions([
                    collocationActions.init(games[id].collocation),
                    gameActions.set(id)
                ]));
            },

            onMoveCharacter(collocation: any, gameId: string, id: string) {
                let {success, message} = games[gameId].landingValidator(collocation, id);

                if (success) {
                    dispatch(batchActions([
                        collocationActions.moveCharacter(id),
                        messageActions.set('')
                    ]));
                } else {
                    dispatch(messageActions.set(message));
                }
            },

            onMoveBoat(collocation, gameId: string) {
                let {success, message} = games[gameId].depetureValidator(collocation);

                if (success) {
                    dispatch(batchActions([
                        collocationActions.moveBoat(),
                        messageActions.set('')
                    ]));
                } else {
                    dispatch(messageActions.set(message));
                }
            },

            onBoatMoveEnd(collocation) {
                let actions: Array<any> = [];

                for (let id of collocation.boat) {
                    actions.push(collocationActions.moveCharacter(id));
                }

                dispatch(batchActions(actions));
            }
        };
    }
)(PagePlayPure);