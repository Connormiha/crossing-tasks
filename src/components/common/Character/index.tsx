import './index.styl';

import * as React from 'react';

const b = bem('character');

interface Props extends React.Props<any> {
    packed?: boolean;
    name: string;
    onClick(e: React.SyntheticEvent): void;
}

export default class Character extends React.PureComponent<Props, {}> {
    render() {
        let {packed, name, onClick} = this.props;

        return (
            <div className={b({skin: name.toLowerCase(), packed}).toString()} onClick={onClick} title={name} />
        );
    }
}
