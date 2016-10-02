import './index.styl';

import * as React from 'react';
import characters from 'characters';

const b = bem('character');

export default class Character extends React.PureComponent<any, any> {
    render() {
        let {id, packed, onClick} = this.props,
            {name} = characters[id];

        return (
            <div className={b({skin: id, packed}).toString()} onClick={onClick} title={name} />
        );
    }
}
