import styles from './index.styl';

import React from 'react';
import {Link} from 'react-router-dom';

interface Props extends React.Props<any> {
    items: string[];
}

export default class ListGames extends React.PureComponent<Props, {}> {
    renderList() {
        let {items} = this.props;

        return items.map((id) => {
            return (
                <li className={styles.item} key={id}>
                    <Link to={`/play/${id}/`}>{id}</Link>
                </li>
            );
        });
    }

    render() {
        return (
            <ul className={styles['list-games']}>
                {this.renderList()}
            </ul>
        );
    }
}
