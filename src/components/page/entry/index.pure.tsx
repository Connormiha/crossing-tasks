import './index.styl';

import * as React from 'react';
import ListGames from 'components/common/ListGames';

const b = bem('entry');

interface Props extends React.Props<any> {
    game: any;
    onSelectGame(): void;
}

export default class PageEntryPure extends React.PureComponent<Props, {}> {
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
