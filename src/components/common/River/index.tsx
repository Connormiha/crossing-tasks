import './index.styl';

import * as React from 'react';

const b = bem('river');

export default class River extends React.PureComponent<any, any> {
    render() {
        return (
            <div className={b.toString()}>
                River!!!!!
            </div>
        );
    }
}
