import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {BrowserRouter as Router} from 'react-router-dom';
import Character from 'components/common/Character';
import PageEntryPure from 'components/page/Entry/index.pure';
import NotFoundPure from 'components/page/NotFound';
import PagePlayPure from 'components/page/Play/index.pure';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';
import noop from 'lodash/noop';
import games from 'games';

const CharactersBlock = [
    'cabbage',
    'farmer',
    'sheep',
    'wolf',
    'dog',
    'caveman',
    'priest',
    'woman_black',
    'woman_white',
    'woman_red',
    'woman_blue',
    'men_black',
    'men_white',
    'men_red',
    'men_blue',
    'boy_red',
    'boy_yellow',
    'girl_red',
    'girl_yellow',
    'policeman',
    'criminal',
    'monkey',
    'gorilla',
].map((item) =>
    <div style={{display: 'inline-block', margin: '10px'}}>
        <Character onClick={action(`Click ${item}`)} name={item} id={`id_${item}`} />
    </div>
);

storiesOf('Character', module)
    .add('Simple', () => {
        return (
            <div style={{background: '#4a8841'}}>
                {CharactersBlock}
            </div>
        );
});

storiesOf('Page entry', module)
    .add('Simple', () => {
        return (
            <Router>
                <PageEntryPure
                    game={{
                        list: Object.keys(games)
                    }}
                />
            </Router>
        );
});

const RouteComponentPropsMock: any = {
    match: {},
    location: {},
    history: {},
};

storiesOf('Page not found', module)
    .add('Simple', () => {
        return (
            <Router>
                <NotFoundPure
                    {...RouteComponentPropsMock}
                />
            </Router>
        );
});

const params = {
    game: {
        finished: false,
        currentGame: 'game_1',
        list: [],
    },
    message: {
        content: '',
        hidden: true,
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
        [BOAT]: [],
        [RIVERSIDE_LEFT]: ['sheep', 'farmer', 'cabbage', 'wolf'],
        [RIVERSIDE_RIGHT]: [],
        boatPosition: RIVERSIDE_LEFT,
        isBoatInvalid: false,
    },
    onMoveCharacter: noop,
    onBoatMoveEnd: noop,
    onFinishGame: noop,
    onStartGame: noop,
    onMoveBoat: noop,
    onChangeVolume: noop,
    onToggleInvalidBoat: noop,
};

storiesOf('Page play', module)
    .add('Game 1', () => {
        return (
            <PagePlayPure
                {...params}
            />
        );
});
