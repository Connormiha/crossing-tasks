import * as React from 'react';

import {connect} from 'react-redux';
import {batchActions} from 'redux-batched-actions';
import * as collocationActions from 'flux/collocation';
import * as messageActions from 'flux/message';
import PageEntryPure from './index.pure';

import game from 'games';

export default connect(
    ({collocation, message}) => ({collocation, message}),
    (dispatch) => {
        return {
            onStartGame() {
                dispatch(collocationActions.init(game.collocation));
            },

            onMoveCharacter(collocation: any, id: string) {
                let {success, message} = game.validator(collocation, id);

                if (success) {
                    dispatch(collocationActions.moveCharacter(id));
                } else {
                    dispatch(messageActions.set(message));
                }
            },

            onMoveBoat(collocation) {
                let {success, message} = game.boatValidator(collocation);

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
)(PageEntryPure);
