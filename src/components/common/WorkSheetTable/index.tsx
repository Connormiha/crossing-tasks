import * as React from 'react';

const b = bem('work-sheet-table');

import './index.styl';
import * as capitalize from 'lodash/capitalize';

const IS_NOT_FIELD = 'is not filled';

export default class FormWorkTable extends React.PureComponent<any, any> {
    render() {
        let {name, surname, sex} = this.props,
            classNameItem = b('item').toString(),
            classNameItemName = b('item-name').toString();

        return (
            <article className={b.toString()}>
                <div className={classNameItem}>
                    <span className={classNameItemName}>Name:</span> {capitalize(name) || <i>{IS_NOT_FIELD}</i>}
                </div>

                <div className={classNameItem}>
                    <span className={classNameItemName}>Surname:</span> {capitalize(surname) || <i>{IS_NOT_FIELD}</i>}
                </div>

                <div className={classNameItem}>
                    <span className={classNameItemName}>Sex:</span> {sex || <i>{IS_NOT_FIELD}</i>}
                </div>
            </article>
        );
    }
}
