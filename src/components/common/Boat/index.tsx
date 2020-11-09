import style from './index.styl';

import React from 'react';
import Сharacter from 'components/common/Character';
import { ICharacterBase } from 'flux/types';

import { PositionCharacter } from 'games';

import bem from 'bem-css-modules';

const b = bem(style);

interface IProps extends React.Props<any> {
  items: string[];
  characters: ICharacterBase<string>[];
  position: PositionCharacter;
  invalid: boolean;
  onMoveCharacter(id: string): void;
  onMoveEnd(): void;
  onShakeEnd(): void;
}

export default class Boat extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  renderItems() {
    const { items, characters, onMoveCharacter } = this.props;

    return items.map((id: string) => {
      return (
        <div className={b('character')} key={id}>
          <Сharacter
            name={characters.find((item) => item.id === id)!.name}
            id={id}
            onClick={onMoveCharacter}
            packed
          />
        </div>
      );
    });
  }

  handleAnimationEnd() {
    if (this.props.invalid) {
      this.props.onShakeEnd();
    }
  }

  render() {
    const { position, invalid, onMoveEnd } = this.props;

    return (
      <div
        className={b({ position, invalid })}
        onTransitionEnd={onMoveEnd}
        onAnimationEnd={this.handleAnimationEnd}
      >
        {this.renderItems()}
      </div>
    );
  }
}
