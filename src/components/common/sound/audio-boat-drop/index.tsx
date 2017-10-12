import AudioBase, {IPropsAudioBase} from 'components/common/sound/audio-base';

interface IProps extends IPropsAudioBase {
    boatItemsLength: number;
}

export default class AudioBoatDrop extends AudioBase<IProps> {

}
