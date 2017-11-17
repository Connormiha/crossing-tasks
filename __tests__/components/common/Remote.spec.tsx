import * as renderer from 'react-test-renderer';
import Remote from 'components/common/Remote';

import noop from 'lodash/noop';

describe('<Remote />', () => {
    it('should render enabled', () => {
        let tree = renderer.create(
            <Remote onClick={noop} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render disabled', () => {
        let tree = renderer.create(
            <Remote onClick={noop} disabled />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});