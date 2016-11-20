import * as renderer from 'react-test-renderer';
import PagePlayPure from 'components/page/Play/index.pure';
import * as noop from 'lodash/noop';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'games';

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

    it('should render (Boat right))', () => {
        let tree = renderer.create(
            <PagePlayPure
                {...params}
                collocation={Object.assign({}, params.collocation, {boatPosition: RIVERSIDE_RIGHT})}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
