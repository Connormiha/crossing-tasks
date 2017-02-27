import * as renderer from 'react-test-renderer';
import Boat from 'components/common/Boat';

import noop from 'lodash/noop';

/* tslint:disable:jsx-wrap-multiline */
describe('<Boat />', () => {
    it('should render', () => {
        let tree = renderer.create(<Boat
            items={[]}
            position="left"
            onMoveEnd={noop}
            onMoveCharacter={noop}
        />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render items', () => {
        let items = [0, 1],
            characters = {0: {name: 'foo'}, 1: {name: 'bar'}},
            tree = renderer.create(
                <Boat
                    items={items}
                    characters={characters}
                    position="left"
                    onMoveEnd={noop}
                    onMoveCharacter={noop}
                />
            ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
