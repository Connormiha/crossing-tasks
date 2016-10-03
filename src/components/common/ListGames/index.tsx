import './index.styl';

import * as React from 'react';

const b = bem('list-games');

export default class ListGames extends React.PureComponent<any, any> {
    renderList() {
        let {items, onClick} = this.props;

        return items.map((id) => {
            return (
                <li key={id} onClick={onClick.bind(null, id)}>
                    {id}
                </li>
            );
        });
    }

    render() {
        let {disabled, onClick} = this.props;

        return (
            <ul className={b.toString()}>
                {this.renderList()}
            </ul>
        );
    }
}
