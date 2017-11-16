import {connect} from 'react-redux';
import Pure from './index.pure';
import {ISchema} from 'reducers/schema';

export default connect(
    ({game}: ISchema) => ({game})
)(Pure);
