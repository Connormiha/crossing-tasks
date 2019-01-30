import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';
import NotFoundPure from 'components/page/not-found';

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
