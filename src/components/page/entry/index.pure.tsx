const styles = require('./index.styl');

import * as React from 'react';
import ListGames from 'components/common/ListGames';

interface Props extends React.Props<any> {
    game: any;
    onSelectGame(): void;
}

export default class PageEntryPure extends React.PureComponent<Props, {}> {
    render() {
        let {game, onSelectGame} = this.props;

        return (
            <div className={styles.page}>
                <div className={styles.content}>
                    <ListGames items={game.list} onClick={onSelectGame} />
                </div>
            </div>
        );
    }
}
