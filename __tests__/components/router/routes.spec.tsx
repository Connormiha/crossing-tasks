import * as renderer from 'react-test-renderer';
import {createAppStore} from 'store';
import {Provider} from 'react-redux';
import routes from 'routes';
import games from 'games';

// Redux
import * as gameActions from 'flux/game';

/* tslint:disable:jsx-wrap-multiline */
describe('Route', () => {
    const originalPathname = location.pathname;
    let store;

    beforeEach(() => {
        store = createAppStore();
        store.dispatch(gameActions.init(Object.keys(games)));
    });

    afterAll(() => {
        Object.defineProperty(location, 'pathname', {
          value: originalPathname,
          configurable: true,
        });
    });

    describe('<EntryPage />', () => {
        it('should render', () => {
            Object.defineProperty(location, 'pathname', {
              value: '/',
              configurable: true,
            });

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
                Object.defineProperty(location, 'pathname', {
                  value: `/play/game_${i}/`,
                  configurable: true,
                });

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
            Object.defineProperty(location, 'pathname', {
              value: `/foo`,
              configurable: true,
            });

            const tree = renderer.create(
                <Provider store={store}>
                    {routes}
                </Provider>
            ).toJSON();

            expect(tree).toMatchSnapshot();
        });
    });
});
