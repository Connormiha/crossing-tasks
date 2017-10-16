import * as renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';
import NotFoundPure from 'components/page/NotFound';

/* tslint:disable:jsx-wrap-multiline */
describe('<NotFoundPure />', () => {
    it('should render', () => {
        const tree = renderer.create(
            <Router>
                <NotFoundPure />
            </Router>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
