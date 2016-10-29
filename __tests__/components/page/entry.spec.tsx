import * as renderer from 'react-test-renderer';
import PageEntryPure from 'components/page/Entry/index.pure';
import games from 'games';

describe('<PageEntryPure />', () => {
    it('should render', () => {
        let tree = renderer.create(
            <PageEntryPure
                game={{
                    list: Object.keys(games)
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
