import styles from './index.styl';

import React from 'react';
import Сharacter from 'components/common/Character';

import {PositionCharacter} from 'games';

interface Props extends React.Props<any> {
    items: string[];
    characters: any;
    position: PositionCharacter;
    invalid: boolean;
    onMoveCharacter(id: string): void;
    onMoveEnd(): void;
}

export default class Boat extends React.PureComponent<Props> {
    renderItems() {
        let {items, characters, onMoveCharacter} = this.props;

        return items.map((id: string) => {
            return (
                <div className={styles.character} key={id}>
                    <Сharacter name={characters[id].name} id={id} onClick={onMoveCharacter} packed />
                </div>
            );
        });
    }

    render() {
        const {position, invalid, onMoveEnd} = this.props;

        let className = `${styles.boat} ${styles['boat_position_' + position]}`;

        if (invalid) {
            className += ` ${styles.boat_invalid}`;
        }

        return (
            <div className={className} onTransitionEnd={onMoveEnd}>
                {this.renderItems()}
            </div>
        );
    }
}
