const styles = require('./index.styl');

import * as React from 'react';

import Riverside from 'components/common/Riverside';
import Boat from 'components/common/Boat';
import Remote from 'components/common/Remote';
import Warning from 'components/common/Warning';

import * as noop from 'lodash/noop';

import games, {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'games';

interface Props extends React.Props<any> {
    game: any;
    collocation: any;
    message: any;
    routeParams: {id: string};
    onMoveCharacter(): void;
    onMoveBoat(): void;
    onBoatMoveEnd(): void;
    onFinishGame(): void;
    onStartGame(id: string): void;
}

export default class PagePlayPure extends React.PureComponent<Props, {}> {
    componentWillMount() {
        this.props.onStartGame(this.props.routeParams.id);
    }

    componentDidUpdate() {
        let {game: {finished}, collocation, onFinishGame} = this.props;

        if (!finished && collocation[BOAT].length === 0 && collocation[RIVERSIDE_LEFT].length === 0) {
            onFinishGame();
        }
    }

    renderFinished(): React.ReactElement<any> {
        return (
            <div className={styles.finish}>
                <div>Finished!</div>
            </div>
        );
    }

    render() {
        let {
            collocation, message, game,
            onMoveCharacter, onMoveBoat, onBoatMoveEnd
        } = this.props,
            characters = games[game.currentGame].characters;

        onMoveCharacter = onMoveCharacter.bind(null, collocation, game.currentGame);

        return (
            <div className={styles.page}>
                <div className={styles.content}>
                    <Riverside
                        items={collocation[RIVERSIDE_LEFT]} characters={characters}
                        onMoveCharacter={collocation.boatPosition === RIVERSIDE_LEFT ? onMoveCharacter : noop} side={RIVERSIDE_LEFT}
                    />
                    <Riverside
                        items={collocation[RIVERSIDE_RIGHT]} characters={characters}
                        side={RIVERSIDE_RIGHT}
                        onMoveCharacter={collocation.boatPosition === RIVERSIDE_RIGHT ? onMoveCharacter : noop}
                    />
                    <Boat
                        items={collocation.boat} position={collocation.boatPosition} invalid={!!message.content} characters={characters}
                        onMoveCharacter={onMoveCharacter} onMoveEnd={onBoatMoveEnd.bind(null, collocation)}
                    />
                    <Remote onClick={onMoveBoat.bind(null, collocation, game.currentGame)} disabled={!collocation.boat.length} />
                    <Warning>{message.content}</Warning>
                    {game.finished &&
                        this.renderFinished()
                    }
                </div>
            </div>
        );
    }
}
