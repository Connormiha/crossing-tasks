import * as renderer from 'react-test-renderer';
import {mapDispatchToProps} from 'components/page/Play';
import PagePlayPure from 'components/page/Play/index.pure';
import {createAppStore} from 'store';
import noop from 'lodash/noop';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'games';
import games from 'games';

/* tslint:disable:jsx-wrap-multiline */
describe('<PagePlayPure />', () => {
    const params = {
        game: {
            finished: false,
            currentGame: 'game_1'
        },
        message: {
            content: ''
        }
        routeParams: {
            id: ''
        },
        collocation: {
            [BOAT]: ['farmer', 'cabbage'],
            [RIVERSIDE_LEFT]: ['sheep'],
            [RIVERSIDE_RIGHT]: ['wolf'],
            boatPosition: RIVERSIDE_LEFT
        },
        onMoveCharacter: noop,
        onBoatMoveEnd: noop,
        onFinishGame: noop,
        onStartGame: noop,
        onMoveBoat: noop
    };

    it('should render', () => {
        let tree = renderer.create(
            <PagePlayPure
                {...params}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render with message', () => {
        let tree = renderer.create(
            <PagePlayPure
                {...params}
                message={{content: 'Test'}}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render (Boat right)', () => {
        let tree = renderer.create(
            <PagePlayPure
                {...params}
                collocation={Object.assign({}, params.collocation, {boatPosition: RIVERSIDE_RIGHT})}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render finished', () => {
        let tree = renderer.create(
            <PagePlayPure
                {...params}
                game={Object.assign({}, params.game, {finished: true})}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

describe('<PagePlay />', () => {
    let store,
        mapProps;

    const getState = () =>
        store.getState();

    beforeEach(() => {
        store = createAppStore();
        mapProps = mapDispatchToProps(store.dispatch);
    });

    it('should work onStartGame', () => {
        let game_1: string = Object.keys(games)[0];

        mapProps.onStartGame(game_1);

        expect(getState().collocation).toEqual(
            Object.assign({}, games[game_1].collocation, {boatPosition: RIVERSIDE_LEFT})
        );

        expect(getState().game).toMatchObject({currentGame: game_1, finished: false});
    });
});
