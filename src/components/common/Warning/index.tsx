import style from './index.styl';

import React from 'react';

import bem from 'bem-css-modules';

const b = bem({...style});

export default class Warning extends React.PureComponent<any> {
    render() {
        let {children} = this.props;

        return (
            <div className={b()}>{children}</div>
        );
    }
}
