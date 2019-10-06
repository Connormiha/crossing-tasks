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
    _audioWave = React.createRef<AudioBase>();
    _audioBoatDrop = React.createRef<AudioBase>();
    _audioShaker = React.createRef<AudioBase>();

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.volume !== this.props.volume) {
            this._audioWave.current!.setVolume(this.props.volume);
            this._audioBoatDrop.current!.setVolume(this.props.volume);
        } else {
            if (this.props.boatPosition !== nextProps.boatPosition) {
                this._audioWave.current!.play();
            }

            if (this.props.boatItemsLength !== nextProps.boatItemsLength) {
                this._audioBoatDrop.current!.play();
            }

            if (nextProps.isInvalid && this.props.isInvalid !== nextProps.isInvalid) {
                this._audioShaker.current!.play();
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <AudioBase
                    srcMp3={audioWaveFileMp3}
                    srcOpus={audioWaveFileOpus}
                    ref={this._audioWave}
                />
                <AudioBase
                    srcMp3={audioBoatDropFileMp3}
                    srcOpus={audioBoatDropFileOpus}
                    ref={this._audioBoatDrop}
                />
                <AudioBase
                    srcMp3={audioShakerFileMp3}
                    srcOpus={audioShakerFileOpus}
                    ref={this._audioShaker}
                />
            </React.Fragment>
        );
    }
}
