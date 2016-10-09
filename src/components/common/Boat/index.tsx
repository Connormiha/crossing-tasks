import './index.styl';

import * as React from 'react';
import Сharacter from 'components/common/Character';

import {BOAT, PositionCharacter} from 'games';

const b = bem(BOAT);

interface Props extends React.Props<any> {
    items: string[];
    characters: any;
    position: PositionCharacter;
    invalid: boolean;
    onMoveCharacter(): void;
    onMoveEnd(): void;
}

export default class Boat extends React.PureComponent<Props, {}> {
    renderItems() {
        let {items, characters, onMoveCharacter} = this.props;

        return items.map((id: string) => {
            return (
                <div className={b('item').toString()} key={id}>
                    <Сharacter name={characters[id].name} onClick={onMoveCharacter.bind(null, id)} packed />
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
