import './index.styl';

import * as React from 'react';

const b = bem('warning');

export default class Boat extends React.PureComponent<any, any> {
    render() {
        let {children} = this.props;

        return (
            <div className={b.toString()}>{children}</div>
        );
    }
}
