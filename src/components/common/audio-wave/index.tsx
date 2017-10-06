import audioFile from 'assets/audio/wave.mp3';
import React from 'react';
import {PositionCharacter} from 'games';

interface IProps {
    position: PositionCharacter;
}

export default class AudioWave extends React.Component<IProps> {
    _audio: HTMLAudioElement;

    shouldComponentUpdate(nextProps) {
        return nextProps.position !== this.props.position;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            this._audio.currentTime = 0;
            this._audio.play();
        }
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
