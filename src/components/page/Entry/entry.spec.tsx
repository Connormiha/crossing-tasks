import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';
import PageEntryPure from 'components/page/entry/index.pure';
import games from 'games';

/* tslint:disable:jsx-wrap-multiline */
describe('<PageEntryPure />', () => {
    it('should render', () => {
        const tree = renderer.create(
            <Router>
                <PageEntryPure
                    game={{
                        list: Object.keys(games),
                        finished: false,
                        currentGame: 'game1'
                    }}
                />
            </Router>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
