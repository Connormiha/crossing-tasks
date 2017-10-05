import style from './index.styl';

import React from 'react';
import Сharacter from 'components/common/Character';

import bem from 'bem-css-modules';

const b = bem({...style});

interface Props extends React.Props<any> {
    side: string;
    items: string[];
    characters: any;
    onMoveCharacter(id: string): void;
}

export default class Riverside extends React.Component<Props> {
    shouldComponentUpdate(nextProps) {
        return this.props.items !== nextProps.items;
    }

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
            <div className={b({side})}>
                {this.renderItems()}
            </div>
        );
    }
}
