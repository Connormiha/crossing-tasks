import * as renderer from 'react-test-renderer';
import Character from 'components/common/Character';

import * as noop from 'lodash/noop';

/* tslint:disable:jsx-wrap-multiline */
describe('<Character />', () => {
    it('should render', () => {
        let tree = renderer.create(
            <Character
                name="farmer"
                onClick={noop}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render packed', () => {
        let tree = renderer.create(
            <Character
                name="sheep"
                packed
                onClick={noop}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
