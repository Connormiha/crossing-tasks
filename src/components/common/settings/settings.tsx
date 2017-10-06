import React from 'react';
import PureComponent from 'components/common/pure-component';
import {PositionCharacter} from 'games';

interface IProps {
    position: PositionCharacter;
}

export default class Settings extends PureComponent<IProps> {
    get _updateItems() {
        return [];
    }

    render() {
        return (
            <audio
                src={audioFile}
                ref={(el: HTMLAudioElement) => this._audio = el}
            />
        );
    }
}
