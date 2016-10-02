import './index.styl';

import * as React from 'react';

const b = bem('entry');

import Riverside from 'components/common/Riverside';
import Boat from 'components/common/Boat';
import River from 'components/common/River';
import Remote from 'components/common/Remote';
import Warning from 'components/common/Warning';

import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT} from 'games';

export default class PageEntryPure extends React.PureComponent<any, any> {
    componentWillMount() {
        this.props.onStartGame();
    }

    render() {
        let {collocation, message, onMoveCharacter, onMoveBoat, onBoatMoveEnd} = this.props;

        onMoveCharacter = onMoveCharacter.bind(null, collocation);

        return (
            <div className={b.toString()}>
                <div className={b('content').toString()}>
                    <Riverside items={collocation[RIVERSIDE_LEFT]} onMoveCharacter={onMoveCharacter} side="left" />
                    <Riverside items={collocation[RIVERSIDE_RIGHT]} onMoveCharacter={onMoveCharacter} side="right" />
                    <Boat
                        items={collocation.boat} position={collocation.boatPosition} invalid={!!message.content}
                        onMoveCharacter={onMoveCharacter} onMoveEnd={onBoatMoveEnd.bind(null, collocation)}
                    />
                    <Remote onClick={onMoveBoat.bind(null, collocation)} disabled={!collocation.boat.length} />
                    <Warning>{message.content}</Warning>
                </div>
            </div>
        );
    }
}
