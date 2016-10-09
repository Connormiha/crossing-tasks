import {connect} from 'react-redux';
import {browserHistory} from "react-router";
import Pure from './index.pure';

export default connect(
    ({game}) => ({game}),
    (dispatch) => {
        return {
            onSelectGame(id: string) {
                browserHistory.push(`/play/${id}/`);
            }
        };
    }
)(Pure);
