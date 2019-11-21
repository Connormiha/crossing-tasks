import React from 'react';
import * as renderer from 'react-test-renderer';
import Remote from 'components/common/remote';

import noop from 'lodash/noop';

describe('<Remote />', () => {
    it('should render enabled', () => {
        const tree = renderer.create(
            <Remote
                onClick={noop}
                disabled={false}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render disabled', () => {
        const tree = renderer.create(
            <Remote onClick={noop} disabled />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
