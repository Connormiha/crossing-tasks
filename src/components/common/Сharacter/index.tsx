import './index.styl';

import * as React from 'react';

const b = bem('character');

export default class Character extends React.PureComponent<any, any> {
    render() {
        let {id, packed, name, onClick} = this.props;

        return (
            <div className={b({skin: name.toLowerCase(), packed}).toString()} onClick={onClick} title={name} />
        );
    }
}
