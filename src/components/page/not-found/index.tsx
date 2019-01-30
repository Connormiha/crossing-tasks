import style from './style.styl';
import React from 'react';
import bem from 'bem-css-modules';

const b = bem(style);

export default class PageNotFound extends React.Component<{}> {
    render() {
        return (
            <div className={b()}>
                <h1 className={b('title')}>Page not found</h1>
            </div>
        );
    }
}
