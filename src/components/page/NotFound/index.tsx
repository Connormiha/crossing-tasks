import style from './style.styl';
import React from 'react';
import bem from 'bem-css-modules';
import {RouteComponentProps} from 'react-router';

const b = bem({...style});

// interface Props extends RouteComponentProps<any> {}

export default class PageNotFound extends React.Component<RouteComponentProps<any>> {
    render() {
        return (
            <div className={b()}>
                <h1 className={b('title')}>Page not found</h1>
            </div>
        );
    }
}
