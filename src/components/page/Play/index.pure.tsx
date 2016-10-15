import './index.styl';

import * as React from 'react';

const b = bem('play');

import Riverside from 'components/common/Riverside';
import Boat from 'components/common/Boat';
import Remote from 'components/common/Remote';
import Warning from 'components/common/Warning';

import * as noop from 'lodash/noop';

import games, {RIVERSIDE_LEFT, RIVERSIDE_RIGHT} from 'games';

interface Props extends React.Props<any> {
    game: any;
    collocation: any;
    message: any;
    routeParams: {id: string};
    onMoveCharacter(): void;
    onMoveBoat(): void;
    onBoatMoveEnd(): void;
    onStartGame(id: string): void;
}

export default class PagePlayPure extends React.PureComponent<Props, {}> {
    componentWillMount() {
        this.props.onStartGame(this.props.routeParams.id);
    }

    render() {
        let {
            collocation, message, game,
            onMoveCharacter, onMoveBoat, onBoatMoveEnd
        } = this.props,
            characters = games[game.currentGame].characters;

        onMoveCharacter = onMoveCharacter.bind(null, collocation, game.currentGame);

        return (
            <div className={b.toString()}>
                <div className={b('content').toString()}>
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
                </div>
            </div>
        );
    }
}