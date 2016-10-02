import './index.styl';

import * as React from 'react';

const b = bem('remote');

export default class Boat extends React.PureComponent<any, any> {
    render() {
        let {disabled, onClick} = this.props;

        return (
            <button className={b.toString()} onClick={onClick} disabled={disabled}>
                Go
            </button>
        );
    }
}
