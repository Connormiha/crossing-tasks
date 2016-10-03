import './index.styl';

import * as React from 'react';
import Сharacter from 'components/common/Сharacter';

import {BOAT} from 'games';

const b = bem(BOAT);

export default class Boat extends React.PureComponent<any, any> {
    renderItems() {
        let {items, characters, onMoveCharacter} = this.props;

        return items.map((id: string) => {
            return (
                <div className={b('item').toString()} key={id}>
                    <Сharacter id={id} name={characters[id].name} onClick={onMoveCharacter.bind(null, id)} packed />
                </div>
            );
        });
    }

    render() {
        const {position, invalid, onMoveEnd} = this.props;

        return (
            <div className={b({position, invalid}).toString()} onTransitionEnd={onMoveEnd}>
                {this.renderItems()}
            </div>
        );
    }
}
