const styles = require('./index.styl');

import * as React from 'react';

export default class Boat extends React.PureComponent<any, any> {
    render() {
        let {disabled, onClick} = this.props;

        return (
            <button className={styles.remote} onClick={onClick} disabled={disabled}>
                Go
            </button>
        );
    }
}
