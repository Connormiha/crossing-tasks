import style from './index.styl';

import React from 'react';
import ListGames from 'components/common/list-games';
import {IGameState} from 'flux/types';

import bem from 'bem-css-modules';

const b = bem(style);

interface Props extends React.Props<any> {
    game: IGameState;
}

export default class PageEntryPure extends React.Component<Props> {
    render() {
        let {game} = this.props;

        return (
            <div className={b()}>
                <div className={b('content')}>
                    <ListGames items={game.list} />
                </div>
            </div>
        );
    }
}
