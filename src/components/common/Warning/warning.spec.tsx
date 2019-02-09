import React from 'react';
import * as renderer from 'react-test-renderer';
import Warning from 'components/common/warning';

describe('<Warning />', () => {
    it('should render', () => {
        let tree = renderer.create(
            <Warning>Foo</Warning>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
