const styles = require('./index.styl');

import * as React from 'react';

interface Props extends React.Props<any> {
    packed?: boolean;
    name: string;
    onClick(e: React.SyntheticEvent): void;
}

export default class Character extends React.PureComponent<Props, {}> {
    render() {
        let {packed, name, onClick} = this.props,
            className = `${styles.character} ${styles['character_skin_' + name.toLowerCase()]}`;

        if (packed) {
            className += ` ${styles.character_packed}`;
        }

        return (
            <div className={className} onClick={onClick} title={name} />
        );
    }
}
