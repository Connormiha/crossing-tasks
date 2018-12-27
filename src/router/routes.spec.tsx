import * as renderer from 'react-test-renderer';
import {createAppStore} from 'store';
import {Provider} from 'react-redux';
import routes from 'router/routes';
import games from 'games';

// Redux
import * as gameActions from 'flux/game';

/* tslint:disable:jsx-wrap-multiline */
describe('Route', () => {
    const originalHref = location.href;
    const originalTitle = document.title;
    let store;

    beforeEach(() => {
        store = createAppStore();
        store.dispatch(gameActions.init(Object.keys(games)));
    });

    afterAll(() => {
        global.history.replaceState({}, originalTitle, originalHref);
    });

    describe('<EntryPage />', () => {
        it('should render', () => {
            global.history.replaceState({}, originalTitle, '/');

            const tree = renderer.create(
                <Provider store={store}>
                    {routes}
                </Provider>
            ).toJSON();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('<PlayPage />', () => {
        for (let i = 1; i < 7; i++) {
            it(`should render game_${i}`, () => {
                global.history.replaceState({}, originalTitle, `/play/game_${i}/`);

                const tree = renderer.create(
                    <Provider store={store}>
                        {routes}
                    </Provider>
                ).toJSON();

                expect(tree).toMatchSnapshot();
            });
        }
    });

    describe('<NotFoundPage />', () => {
        it(`should render /foo`, () => {
            global.history.replaceState({}, originalTitle, '/foo');

            const tree = renderer.create(
                <Provider store={store}>
                    {routes}
                </Provider>
            ).toJSON();

            expect(tree).toMatchSnapshot();
        });
    });
});
