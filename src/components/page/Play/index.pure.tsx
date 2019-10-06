import style from './index.styl';

import React from 'react';

import Settings from 'components/common/settings';
import Riverside from 'components/common/riverside';
import Boat from 'components/common/boat';
import Remote from 'components/common/remote';
import Warning from 'components/common/warning';
import Sound from 'components/common/sound';

import {bindMethods} from 'helpers';
import noop from 'lodash/noop';

import games from 'games';
import {
    RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT,
    IGameState, IMessageState, ISettingsState, ICollocationState,
} from 'flux/types';

import bem from 'bem-css-modules';

const b = bem(style);

interface IProps extends React.Props<any> {
    game: IGameState;
    collocation: ICollocationState;
    message: IMessageState;
    settings: ISettingsState;
    match: {params: any};
    onMoveCharacter(collocation: ICollocationState, gameId: string, id: string): void;
    onMoveBoat(collocation: ICollocationState, gameId: string): void;
    onBoatMoveEnd(collocation: ICollocationState): void;
    onFinishGame(): void;
    onStartGame(id: string): void;
    onChangeVolume(volume: number): void;
    onToggleInvalidBoat(isBoatInvalid: boolean): void;
}

export default class PagePlayPure extends React.Component<IProps> {
    constructor(props) {
        super(props);
        bindMethods(this, ['handleMoveCharacter', 'handleMoveBoat', 'handleMoveBoatEnd', 'handleShakeEnd']);
        this.props.onStartGame(this.props.match.params.id);
    }

    componentDidUpdate() {
        let {game: {finished}, collocation, onFinishGame} = this.props;

        if (!finished && collocation[BOAT].length === 0 && collocation[RIVERSIDE_LEFT].length === 0) {
            onFinishGame();
        }
    }

    handleMoveCharacter(id: string): void {
        let {collocation, game, onMoveCharacter} = this.props;

        onMoveCharacter(collocation, game.currentGame, id);
    }

    handleMoveBoat() {
        let {collocation, game, onMoveBoat} = this.props;

        onMoveBoat(collocation, game.currentGame);
    }

    handleMoveBoatEnd() {
        let {collocation, onBoatMoveEnd} = this.props;

        onBoatMoveEnd(collocation);
    }

    handleShakeEnd() {
        this.props.onToggleInvalidBoat(false);
    }

    renderFinished(): React.ReactElement<any> {
        return (
            <div className={b('finish')}>
                <div>Finished!</div>
            </div>
        );
    }

    render() {
        let {collocation, message, game, settings, onChangeVolume} = this.props,
            characters = games[game.currentGame].characters;

        return (
            <div className={b()}>
                <div className={b('content')}>
                    <Riverside
                        items={collocation[RIVERSIDE_LEFT]}
                        characters={characters}
                        side={RIVERSIDE_LEFT}
                        onMoveCharacter={collocation.boatPosition === RIVERSIDE_LEFT ? this.handleMoveCharacter : noop}
                    />
                    <Riverside
                        items={collocation[RIVERSIDE_RIGHT]}
                        characters={characters}
                        side={RIVERSIDE_RIGHT}
                        onMoveCharacter={collocation.boatPosition === RIVERSIDE_RIGHT ? this.handleMoveCharacter : noop}
                    />
                    <Boat
                        items={collocation.boat}
                        position={collocation.boatPosition}
                        invalid={collocation.isBoatInvalid}
                        characters={characters}
                        onMoveCharacter={this.handleMoveCharacter}
                        onMoveEnd={this.handleMoveBoatEnd}
                        onShakeEnd={this.handleShakeEnd}
                    />
                    <Remote onClick={this.handleMoveBoat} disabled={!collocation.boat.length} />
                    <Settings settings={settings} onChangeVolume={onChangeVolume} />
                    <Sound
                        boatPosition={collocation.boatPosition}
                        boatItemsLength={collocation.boat.length}
                        volume={settings.volume}
                        isInvalid={collocation.isBoatInvalid}
                    />
                    {message.content &&
                        <Warning>{message.content}</Warning>
                    }
                    {game.finished &&
                        this.renderFinished()
                    }
                </div>
            </div>
        );
    }
}
