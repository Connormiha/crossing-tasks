import View from 'components/common/WorkSheetTable';
import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';

describe('WorkSheetTable', () => {
    it('should render', () => {
        const view: ShallowWrapper<any, {}> = shallow(
          <View />
        );

        expect(view.find('.work-sheet-table').length).toBe(1);
    });
});
