import style from './settings.styl';
import React from 'react';
import {bindMethods} from 'helpers';
import bem from 'bem-css-modules';

import {ISettingsState} from 'flux/types';

const b = bem(style);

interface IProps {
    settings: ISettingsState;
    onChangeVolume(string): void;
}

interface IState {
    isVolumeRangeEnabled: boolean;
}

export default class Settings extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
        bindMethods(this, ['handleChangeVolume', 'handleToggleVolumeControl', 'handleBlurVolume']);

        this.state = {
            isVolumeRangeEnabled: false,
        };
    }

    handleToggleVolumeControl() {
        this.setState({isVolumeRangeEnabled: !this.state.isVolumeRangeEnabled});
    }

    handleChangeVolume(e: any) {
        e.preventDefault();
        this.props.onChangeVolume(parseFloat(e.target.value));
    }

    handleBlurVolume(e: any) {
        e.preventDefault();
        this.setState({isVolumeRangeEnabled: false});
    }

    render() {
        const {isVolumeRangeEnabled} = this.state;
        const {volume} = this.props.settings;
        let volumeType;

        if (!volume) {
            volumeType = 'mute';
        } else if (volume < 0.5) {
            volumeType = 'low';
        } else {
            volumeType = 'high';
        }

        return (
            <div className={b()}>
                <div className={b('volume', {type: volumeType})}>
                    <div
                        className={b('volume-toggler')}
                        onClick={this.handleToggleVolumeControl}
                    />
                    <input
                        type="range"
                        value={volume}
                        min="0"
                        max="1"
                        step="0.05"
                        onChange={this.handleChangeVolume}
                        onBlur={this.handleBlurVolume}
                        className={b('volume-range', {hidden: !isVolumeRangeEnabled})}
                    />
                </div>
            </div>
        );
    }
}
