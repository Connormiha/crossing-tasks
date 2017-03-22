import * as renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';
import PageEntryPure from 'components/page/Entry/index.pure';
import games from 'games';

/* tslint:disable:jsx-wrap-multiline */
describe('<PageEntryPure />', () => {
    it('should render', () => {
        let tree = renderer.create(
            <Router>
                <PageEntryPure
                    game={{
                        list: Object.keys(games)
                    }}
                />
            </Router>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
