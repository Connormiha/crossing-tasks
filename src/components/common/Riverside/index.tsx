const styles = require('./index.styl');

import * as React from 'react';
import Сharacter from 'components/common/Character';

interface Props extends React.Props<any> {
    side: string;
    items: string[];
    characters: any;
    onMoveCharacter(): void;
}

export default class Riverside extends React.PureComponent<Props, null> {
    renderItems() {
        let {onMoveCharacter, characters, items} = this.props;

        return items.map((id: string) => {
            return (
                <div key={id}>
                    <Сharacter name={characters[id].name} onClick={onMoveCharacter.bind(null, id)} />
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
