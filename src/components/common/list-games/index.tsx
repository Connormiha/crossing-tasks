import style from './index.styl';

import React from 'react';
import { Link } from 'react-router-dom';

import bem from 'bem-css-modules';

const b = bem(style);

interface Props extends React.Props<any> {
  items: string[];
}

export default class ListGames extends React.Component<Props> {
  renderList() {
    const { items } = this.props;

    return items.map((id) => {
      return (
        <li className={b('item')} key={id}>
          <Link to={`/play/${id}/`}>{id}</Link>
        </li>
      );
    });
  }

  render() {
    return <ul className={b()}>{this.renderList()}</ul>;
  }
}
