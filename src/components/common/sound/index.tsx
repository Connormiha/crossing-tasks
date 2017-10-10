import React from 'react';
import AudioWave from './audio-wave';
import {PositionCharacter} from 'games';

interface IProps {
    boatPosition: PositionCharacter;
    volume: string;
}

export default class Sound extends React.PureComponent<IProps> {
    render() {
        const {boatPosition, volume} = this.props;

        return [
            (
                <AudioWave
                    position={boatPosition}
                    volume={volume}
                    key="wave"
                />
            )
        ];
    }
}
