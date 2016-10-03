import './index.styl';
const b = bem('riverside');

import * as React from 'react';
import Сharacter from 'components/common/Сharacter';

export default class Riverside extends React.PureComponent<any, any> {
    renderItems() {
        let {onMoveCharacter, characters, items} = this.props;

        return items.map((id) => {
            return (
                <div className={b('item').toString()} key={id}>
                    <Сharacter id={id} name={characters[id].name} onClick={onMoveCharacter.bind(null, id)} />
                </div>
            );
        });
    }

    render() {
        const {side} = this.props;

        return (
            <div className={b({side}).toString()}>
                {this.renderItems()}
            </div>
        );
    }
}
