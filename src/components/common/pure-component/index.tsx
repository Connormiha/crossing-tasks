import shouldUpdateOptimize from 'helpers/shouldUpdateOptimize';
import React from 'react';

export default class PureComponent<Props> extends React.Component<Props> {
    _shouldComponentUpdate: (props1: any, props2: any) => boolean;
    _updateItems: string[];

    constructor(props: Props) {
        super(props);

        this._shouldComponentUpdate = shouldUpdateOptimize(this._updateItems);
    }

    shouldComponentUpdate(nextProps: Props) {
        return this._shouldComponentUpdate(this.props, nextProps);
    }
}
