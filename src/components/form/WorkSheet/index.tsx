import * as React from 'react';

const b = bem('form-work-sheet');

import './index.styl';

export default class FormWorkSheet extends React.PureComponent<any, any> {
    render() {
        let {name, surname, sex, onChangeName, onChangeSurname, onChangeSex} = this.props,
            classNameLabel = b('label'),
            classNameLabelTitle = b('label-title');

        return (
            <form className={b}>
                <label className={classNameLabel}>
                    <span className={classNameLabelTitle}>Name:</span>
                    <input value={name} onChange={onChangeName} />
                </label>

                <label className={classNameLabel}>
                    <span className={classNameLabelTitle}>Surname:</span>
                    <input value={surname} onChange={onChangeSurname} />
                </label>

                <label className={classNameLabel}>
                    <span className={classNameLabelTitle}>Sex:</span>
                    <select onChange={onChangeSex} defaultValue={sex}>
                        {['male', 'female'].map((item) => {
                            return (
                                <option key={item} value={item}>{item}</option>
                            );
                        })}
                    </select>
                </label>
            </form>
        );
    }
}
