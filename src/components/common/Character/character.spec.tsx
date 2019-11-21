import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Character from 'components/common/character';

import noop from 'lodash/noop';

/* tslint:disable:jsx-wrap-multiline */
describe('<Character />', () => {
    it('should render', () => {
        const tree = renderer.create(
            <Character
                name="Farmer"
                id="farmer"
                onClick={noop}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render packed', () => {
        const tree = renderer.create(
            <Character
                name="Sheep"
                id="sheep"
                packed
                onClick={noop}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
