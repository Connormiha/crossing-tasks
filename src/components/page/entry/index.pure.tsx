import './index.styl';

import * as React from 'react';

const b = bem('entry');

import Riverside from 'components/common/Riverside';
import Boat from 'components/common/Boat';
import River from 'components/common/River';
import Remote from 'components/common/Remote';
import Warning from 'components/common/Warning';
import ListGames from 'components/common/ListGames';

import games, {RIVERSIDE_LEFT, RIVERSIDE_RIGHT} from 'games';

export default class PageEntryPure extends React.PureComponent<any, any> {
    componentWillMount() {
        this.props.onStartGame('game_1');
    }

    render() {
        let {
            collocation, message, game,
            onMoveCharacter, onMoveBoat, onBoatMoveEnd, onStartGame
        } = this.props,
            characters = games[game.currentGame].characters;

        onMoveCharacter = onMoveCharacter.bind(null, collocation, game.currentGame);

        return (
            <div className={b.toString()}>
                <div className={b('content').toString()}>
                    <Riverside
                        items={collocation[RIVERSIDE_LEFT]} characters={characters}
                        onMoveCharacter={onMoveCharacter} side="left"
                    />
                    <Riverside
                        items={collocation[RIVERSIDE_RIGHT]} characters={characters}
                        onMoveCharacter={onMoveCharacter} side="right"
                    />
                    <Boat
                        items={collocation.boat} position={collocation.boatPosition} invalid={!!message.content} characters={characters}
                        onMoveCharacter={onMoveCharacter} onMoveEnd={onBoatMoveEnd.bind(null, collocation)}
                    />
                    <Remote onClick={onMoveBoat.bind(null, collocation, game.currentGame)} disabled={!collocation.boat.length} />
                    <Warning>{message.content}</Warning>
                </div>
                <ListGames items={game.list} onClick={onStartGame} />
            </div>
        );
    }
}
