import './index.styl';

import * as React from 'react';

const b = bem('list-games');

interface Props extends React.Props<any> {
    items: string[];
    onClick(): void;
}

export default class ListGames extends React.PureComponent<Props, {}> {
    renderList() {
        let {items, onClick} = this.props;

        return items.map((id) => {
            return (
                <li className={b('item')} key={id} onClick={onClick.bind(null, id)}>
                    {id}
                </li>
            );
        });
    }

    render() {
        return (
            <ul className={b.toString()}>
                {this.renderList()}
            </ul>
        );
    }
}
