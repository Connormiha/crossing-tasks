import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';
import * as collocationActions from 'flux/collocation';
import * as messageActions from 'flux/message';
import * as gameActions from 'flux/game';
import * as settingsActions from 'flux/settings';
import PagePlayPure from './index.pure';
import { IGameState } from 'flux/types';

import games from 'games';

export const mapDispatchToProps = (dispatch) => {
  return {
    onStartGame(id: string) {
      dispatch(
        batchActions([
          collocationActions.init(games[id].collocation),
          gameActions.set(id),
          collocationActions.toggleBoatInvalid(false),
        ]),
      );
    },

    onMoveCharacter(collocation: any, gameId: string, id: string) {
      const { success, message } = games[gameId].landingValidator(collocation, id);

      if (success) {
        dispatch(
          batchActions([
            collocationActions.moveCharacter(id),
            messageActions.set(''),
            collocationActions.toggleBoatInvalid(false),
          ]),
        );
      } else {
        dispatch(
          batchActions([messageActions.set(message), collocationActions.toggleBoatInvalid(true)]),
        );
      }
    },

    onMoveBoat(collocation: any, gameId: string) {
      const { success, message } = games[gameId].depetureValidator(collocation);

      if (success) {
        dispatch(
          batchActions([
            collocationActions.moveBoat(),
            messageActions.set(''),
            collocationActions.toggleBoatInvalid(false),
          ]),
        );
      } else {
        dispatch(
          batchActions([messageActions.set(message), collocationActions.toggleBoatInvalid(true)]),
        );
      }
    },

    onBoatMoveEnd(collocation: any) {
      const actions: any[] = [collocationActions.toggleBoatInvalid(false)];

      for (const id of collocation.boat) {
        actions.push(collocationActions.moveCharacter(id));
      }

      dispatch(batchActions(actions));
    },

    onToggleInvalidBoat(isBoatInvalid: boolean) {
      dispatch(collocationActions.toggleBoatInvalid(isBoatInvalid));
    },

    onFinishGame() {
      dispatch(gameActions.finish());
    },

    onChangeVolume(volume: number) {
      dispatch(settingsActions.setVolume(volume));
    },
  };
};

export default connect((state: IGameState) => state, mapDispatchToProps)(PagePlayPure);
