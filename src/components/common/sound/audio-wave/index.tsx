import {PositionCharacter} from 'games';
import AudioBase, {IPropsAudioBase} from 'components/common/sound/audio-base';

interface IProps extends IPropsAudioBase {
    position: PositionCharacter;
}

export default class AudioWave extends AudioBase<IProps> {

}
