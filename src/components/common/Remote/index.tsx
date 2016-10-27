const styles = require('./index.styl');

import * as React from 'react';

interface Props extends React.Props<any> {
    disabled: boolean;
    onClick(): void;
}

export default class Boat extends React.PureComponent<Props, null> {
    render() {
        let {disabled, onClick} = this.props;

        return (
            <button className={styles.remote} onClick={onClick} disabled={disabled}>
                Go
            </button>
        );
    }
}
