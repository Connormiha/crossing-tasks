import * as styles from './index.styl';

import * as React from 'react';
import {bindMethods} from 'helpers';

interface Props extends React.Props<any> {
    packed?: boolean;
    name: string;
    id: string;
    onClick(id: string): void;
}

export default class Character extends React.PureComponent<Props, null> {
    constructor(props) {
        super(props);
        bindMethods(this, ['handleClick']);
    }

    handleClick() {
        this.props.onClick(this.props.id);
    }

    render() {
        let {packed, name} = this.props,
            className = `${styles.character} ${styles['character_skin_' + name.toLowerCase()]}`;

        if (packed) {
            className += ` ${styles.character_packed}`;
        }

        return (
            <div className={className} onClick={this.handleClick} title={name} />
        );
    }
}
