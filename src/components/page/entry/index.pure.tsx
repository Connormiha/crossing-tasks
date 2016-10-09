import './index.styl';

import * as React from 'react';
import ListGames from 'components/common/ListGames';

const b = bem('entry');

export default class PageEntryPure extends React.PureComponent<any, {}> {
    render() {
        let {game, onSelectGame} = this.props;

        return (
            <div className={b.toString()}>
                <div className={b('content').toString()}>
                    <ListGames items={game.list} onClick={onSelectGame} />
                </div>
            </div>
        );
    }
}
