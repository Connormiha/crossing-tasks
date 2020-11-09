import shouldUpdateOptimize from 'helpers/shouldUpdateOptimize';
import React from 'react';

export default class PureComponent<Props, State = {}> extends React.Component<Props, State> {
  _shouldComponentUpdate: (props1: any, props2: any) => boolean;
  _updateItems!: string[];

  constructor(props: Props) {
    super(props);

    this._shouldComponentUpdate = shouldUpdateOptimize(this._updateItems);
  }

  shouldComponentUpdate(nextProps: Props) {
    return this._shouldComponentUpdate(this.props, nextProps);
  }
}
