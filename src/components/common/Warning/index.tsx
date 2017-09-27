import styles from './index.styl';

import React from 'react';

export default class Warning extends React.PureComponent<any> {
    render() {
        let {children} = this.props;

        return (
            <div className={styles.warning}>{children}</div>
        );
    }
}
