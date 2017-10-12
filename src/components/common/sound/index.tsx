import React from 'react';
import AudioWave from './audio-wave';
import AudioBoatDrop from './audio-boat-drop';
import audioWaveFileMp3 from 'assets/audio/wave.mp3';
import audioWaveFileOpus from 'assets/audio/wave.opus';
import audioBoatDropFileMp3 from 'assets/audio/water-drop.mp3';
import audioBoatDropFileOpus from 'assets/audio/water-drop.opus';

import {PositionCharacter} from 'games';

interface IProps {
    boatPosition: PositionCharacter;
    boatItemsLength: number;
    volume: number;
}

export default class Sound extends React.PureComponent<IProps> {
    _audioWave: AudioWave;
    _audioBoatDrop: AudioBoatDrop;

    componentDidUpdate(prevProps) {
        if (prevProps.volume !== this.props.volume) {
            this._audioWave.setVolume(this.props.volume);
            this._audioBoatDrop.setVolume(this.props.volume);
        }
    }

    render() {
        const {boatPosition, boatItemsLength} = this.props;

        return [
            (
                <AudioWave
                    position={boatPosition}
                    srcMp3={audioWaveFileMp3}
                    srcOpus={audioWaveFileOpus}
                    ref={(el: AudioWave) => this._audioWave = el}
                    key="wave"
                />
            ),
            (
                <AudioBoatDrop
                    boatItemsLength={boatItemsLength}
                    srcMp3={audioBoatDropFileMp3}
                    srcOpus={audioBoatDropFileOpus}
                    ref={(el: AudioBoatDrop) => this._audioBoatDrop = el}
                    key="boat-drop"
                />
            ),
        ];
    }
}
