import audioFile from 'assets/audio/wave.mp3';
import React from 'react';
import {PositionCharacter} from 'games';

interface IProps {
    position: PositionCharacter;
    volume: string;
}

export default class AudioWave extends React.PureComponent<IProps> {
    _audio: HTMLAudioElement;

    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            this._audio.currentTime = 0;
            this._audio.play();
        }

        this._audio.volume = parseFloat(this.props.volume);
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
