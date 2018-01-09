import React from 'react';
import AudioBase from './audio-base';
import audioWaveFileMp3 from 'assets/audio/wave.mp3';
import audioWaveFileOpus from 'assets/audio/wave.opus';
import audioBoatDropFileMp3 from 'assets/audio/water-drop.mp3';
import audioBoatDropFileOpus from 'assets/audio/water-drop.opus';
import audioShakerFileMp3 from 'assets/audio/shaker.mp3';
import audioShakerFileOpus from 'assets/audio/shaker.opus';

import {PositionCharacter} from 'games';

interface IProps {
    boatPosition: PositionCharacter;
    boatItemsLength: number;
    volume: number;
    isInvalid: boolean;
}

export default class Sound extends React.Component<IProps> {
    _audioWave: AudioBase;
    _audioBoatDrop: AudioBase;
    _audioShaker: AudioBase;

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.volume !== this.props.volume) {
            this._audioWave.setVolume(this.props.volume);
            this._audioBoatDrop.setVolume(this.props.volume);
        } else {
            if (this.props.boatPosition !== nextProps.boatPosition) {
                this._audioWave.play();
            }

            if (this.props.boatItemsLength !== nextProps.boatItemsLength) {
                this._audioBoatDrop.play();
            }

            if (nextProps.isInvalid && this.props.isInvalid !== nextProps.isInvalid) {
                this._audioShaker.play();
            }
        }
    }

    render() {
        return [
            (
                <AudioBase
                    srcMp3={audioWaveFileMp3}
                    srcOpus={audioWaveFileOpus}
                    ref={(el: AudioBase) => this._audioWave = el}
                    key="wave"
                />
            ),
            (
                <AudioBase
                    srcMp3={audioBoatDropFileMp3}
                    srcOpus={audioBoatDropFileOpus}
                    ref={(el: AudioBase) => this._audioBoatDrop = el}
                    key="boat-drop"
                />
            ),
            (
                <AudioBase
                    srcMp3={audioShakerFileMp3}
                    srcOpus={audioShakerFileOpus}
                    ref={(el: AudioBase) => this._audioShaker = el}
                    key="shaker"
                />
            ),
        ];
    }
}
