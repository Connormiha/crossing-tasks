import {connect} from 'react-redux';
import Pure from './index.pure';

export default connect(
    ({game}) => ({game})
)(Pure);
