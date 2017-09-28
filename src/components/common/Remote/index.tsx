import style from './index.styl';

import React from 'react';

import bem from 'bem-css-modules';

const b = bem({...style});

interface Props extends React.Props<any> {
    disabled: boolean;
    onClick(): void;
}

export default class Boat extends React.PureComponent<Props> {
    render() {
        let {disabled, onClick} = this.props;

        return (
            <button className={b()} onClick={onClick} disabled={disabled}>
                Go
            </button>
        );
    }
}
