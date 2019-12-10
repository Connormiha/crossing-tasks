import React from 'react';
import * as renderer from 'react-test-renderer';
import Boat from 'components/common/boat';

import noop from 'lodash/noop';

describe('<Boat />', () => {
    it('should render', () => {
        const tree = renderer.create(<Boat
            items={[]}
            characters={[]}
            position="left"
            onMoveEnd={noop}
            onMoveCharacter={noop}
            onShakeEnd={noop}
            invalid={false}
        />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render items', () => {
        const items = ['0', '1'],
            characters = [{id: '1', name: 'sheep'}, {id: '2', name: 'farmer'}],
            tree = renderer.create(
                <Boat
                    items={items}
                    characters={characters}
                    position="left"
                    invalid={false}
                    onMoveEnd={noop}
                    onMoveCharacter={noop}
                    onShakeEnd={noop}
                />
            ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
