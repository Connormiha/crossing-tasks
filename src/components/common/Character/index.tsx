import style from './index.styl';

import React from 'react';
import {bindMethods} from 'helpers';

import bem from 'bem-css-modules';

const b = bem(style);

interface Props extends React.Props<any> {
    packed?: boolean;
    name: string;
    id: string;
    onClick(id: string): void;
}

export default class Character extends React.Component<Props> {
    constructor(props) {
        super(props);
        bindMethods(this, ['handleClick']);
    }

    shouldComponentUpdate() {
        return false;
    }

    handleClick() {
        this.props.onClick(this.props.id);
    }

    render() {
        let {packed, name} = this.props;

        return (
            <div className={b({skin: name.toLowerCase(), packed: !!packed})} onClick={this.handleClick} title={name} />
        );
    }
}
