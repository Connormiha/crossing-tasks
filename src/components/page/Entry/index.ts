import {connect} from 'react-redux';
import {browserHistory} from "react-router";
import Pure from './index.pure';

export default connect(
    ({game}) => ({game})
)(Pure);
