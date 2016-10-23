const styles = require('./index.styl');

import * as React from 'react';

interface Props extends React.Props<any> {
    items: string[];
    onClick(): void;
}

export default class ListGames extends React.PureComponent<Props, {}> {
    renderList() {
        let {items, onClick} = this.props;

        return items.map((id) => {
            return (
                <li className={styles.item} key={id} onClick={onClick.bind(null, id)}>
                    {id}
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
