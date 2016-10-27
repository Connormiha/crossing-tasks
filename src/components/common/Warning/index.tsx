const styles = require('./index.styl');

import * as React from 'react';

export default class Boat extends React.PureComponent<any, null> {
    render() {
        let {children} = this.props;

        return (
            <div className={styles.warning}>{children}</div>
        );
    }
}
