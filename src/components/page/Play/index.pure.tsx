import styles from './index.styl';

import React from 'react';

import Riverside from 'components/common/Riverside';
import Boat from 'components/common/Boat';
import Remote from 'components/common/Remote';
import Warning from 'components/common/Warning';

import {bindMethods} from 'helpers';
import noop from 'lodash/noop';

import games, {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'games';

interface Props extends React.Props<any> {
    game: any;
    collocation: any;
    message: any;
    match: {params: any};
    onMoveCharacter(collocation: any, gameId: string, id: string): void;
    onMoveBoat(collocation: any, gameId: string): void;
    onBoatMoveEnd(collocation: any): void;
    onFinishGame(): void;
    onStartGame(id: string): void;
}

export default class PagePlayPure extends React.PureComponent<Props> {
    constructor(props) {
        super(props);
        bindMethods(this, ['handleMoveCharacter', 'handleMoveBoat', 'handleMoveBoatEnd']);
    }

    componentWillMount() {
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

    renderFinished(): React.ReactElement<any> {
        return (
            <div className={styles.finish}>
                <div>Finished!</div>
            </div>
        );
    }

    render() {
        let {collocation, message, game} = this.props,
            characters = games[game.currentGame].characters;

        return (
            <div className={styles.page}>
                <div className={styles.content}>
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
                        invalid={!!message.content}
                        characters={characters}
                        onMoveCharacter={this.handleMoveCharacter}
                        onMoveEnd={this.handleMoveBoatEnd}
                    />
                    <Remote onClick={this.handleMoveBoat} disabled={!collocation.boat.length} />
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
