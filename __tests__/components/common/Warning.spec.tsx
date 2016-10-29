import * as renderer from 'react-test-renderer';
import Warning from 'components/common/Warning';

describe('<Warning />', () => {
    it('should render', () => {
        let tree = renderer.create(
            <Warning>Foo</Warning>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
