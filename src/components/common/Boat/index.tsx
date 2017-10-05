import style from './index.styl';
import PureComponent from 'components/common/pure-component';

import React from 'react';
import Сharacter from 'components/common/Character';

import {PositionCharacter} from 'games';

import bem from 'bem-css-modules';

const b = bem({...style});

interface Props extends React.Props<any> {
    items: string[];
    characters: any;
    position: PositionCharacter;
    invalid: boolean;
    onMoveCharacter(id: string): void;
    onMoveEnd(): void;
}

export default class Boat extends PureComponent<Props> {
    get _updateItems() {
        return ['items', 'position', 'invalid'];
    }

    renderItems() {
        let {items, characters, onMoveCharacter} = this.props;

        return items.map((id: string) => {
            return (
                <div className={b('character')} key={id}>
                    <Сharacter name={characters[id].name} id={id} onClick={onMoveCharacter} packed />
                </div>
            );
        });
    }

    render() {
        const {position, invalid, onMoveEnd} = this.props;

        return (
            <div className={b({position, invalid})} onTransitionEnd={onMoveEnd}>
                {this.renderItems()}
            </div>
        );
    }
}
