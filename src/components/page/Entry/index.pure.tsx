import styles from './index.styl';

import React from 'react';
import ListGames from 'components/common/ListGames';

interface Props extends React.Props<any> {
    game: any;
}

export default class PageEntryPure extends React.PureComponent<Props, {}> {
    render() {
        let {game} = this.props;

        return (
            <div className={styles.page}>
                <div className={styles.content}>
                    <ListGames items={game.list} />
                </div>
            </div>
        );
    }
}