import React from 'react';

export interface IPropsAudioBase {
    srcMp3: string;
    srcOpus: string;
}

export default class AudioBase<Props extends IPropsAudioBase> extends React.PureComponent<Props> {
    _audio: HTMLAudioElement;

    componentDidUpdate() {
        this._audio.currentTime = 0;
        this._audio.play();
    }

    setVolume(volume: number) {
        this._audio.volume = volume;
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
