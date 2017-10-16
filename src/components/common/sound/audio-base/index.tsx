import React from 'react';

export interface IPropsAudioBase {
    srcMp3: string;
    srcOpus: string;
}

export default class AudioBase extends React.Component<IPropsAudioBase> {
    _audio: HTMLAudioElement;

    shouldComponentUpdate() {
        return false;
    }

    setVolume(volume: number) {
        this._audio.volume = volume;
    }

    play() {
        this._audio.currentTime = 0;
        this._audio.play();
    }

    render() {
        return (
            <audio
                ref={(el: HTMLAudioElement) => this._audio = el}
            >
                <source src={this.props.srcOpus} type="audio/ogg; codecs=opus" />
                <source src={this.props.srcMp3} type="audio/mpeg" />
            </audio>
        );
    }
}
