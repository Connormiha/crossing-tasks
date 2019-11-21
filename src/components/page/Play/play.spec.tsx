import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {mapDispatchToProps} from 'components/page/Play';
import PagePlayPure from 'components/page/play/index.pure';
import {createAppStore} from 'store';
import noop from 'lodash/noop';
import games from 'games';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

/* tslint:disable:jsx-wrap-multiline */
describe('<PagePlayPure />', () => {
    const params = {
        game: {
            list: [],
            finished: false,
            currentGame: 'game1'
        },
        message: {
            content: '',
            hidden: true
        },
        match: {
            params: {
                id: ''
            }
        },
        settings: {
            volume: 1,
        },
        collocation: {
            [BOAT]: ['farmer', 'cabbage'],
            [RIVERSIDE_LEFT]: ['sheep'],
            [RIVERSIDE_RIGHT]: ['wolf'],
            boatPosition: RIVERSIDE_LEFT,
            isBoatInvalid: false,
        },
        onToggleInvalidBoat: noop,
        onChangeVolume: noop,
        onMoveCharacter: noop,
        onBoatMoveEnd: noop,
        onFinishGame: noop,
        onStartGame: noop,
        onMoveBoat: noop
    };

    it('should render', () => {
        const tree = renderer.create(
            <PagePlayPure
                {...params}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render with message', () => {
        const tree = renderer.create(
            <PagePlayPure
                {...params}
                message={{content: 'Test', hidden: false}}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render (Boat right)', () => {
        const tree = renderer.create(
            <PagePlayPure
                {...params}
                collocation={{...params.collocation, boatPosition: RIVERSIDE_RIGHT}}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render finished', () => {
        const tree = renderer.create(
            <PagePlayPure
                {...params}
                game={{...params.game, finished: true}}
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
        const game1: string = Object.keys(games)[0];

        mapProps.onStartGame(game1);

        expect(getState().collocation).toEqual(
            {...games[game1].collocation, boatPosition: RIVERSIDE_LEFT, isBoatInvalid: false}
        );

        expect(getState().game).toMatchObject({currentGame: game1, finished: false});
    });
});
