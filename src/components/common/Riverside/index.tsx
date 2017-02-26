import styles from './index.styl';

import React from 'react';
import Сharacter from 'components/common/Character';

interface Props extends React.Props<any> {
    side: string;
    items: string[];
    characters: any;
    onMoveCharacter(id: string): void;
}

export default class Riverside extends React.PureComponent<Props, null> {
    renderItems() {
        let {onMoveCharacter, characters, items} = this.props;

        return items.map((id: string) => {
            return (
                <div key={id}>
                    <Сharacter name={characters[id].name} id={id} onClick={onMoveCharacter} />
                </div>
            );
        });
    }

    render() {
        const {side} = this.props;

        return (
            <div className={`${styles.riverside} ${styles['riverside_side_' + side]}`}>
                {this.renderItems()}
            </div>
        );
    }
}
