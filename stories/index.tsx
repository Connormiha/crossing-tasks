import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {BrowserRouter as Router} from 'react-router-dom';
import Character from 'components/common/Character';
import PageEntryPure from 'components/page/Entry/index.pure';
import NotFoundPure from 'components/page/NotFound';
import games from 'games';
import uniq from 'lodash/uniq';
import './pages/game';

let charactersList: string[] = ((): string[] => {
    const result: string[] = [];

    for (const item in games) {
        if (!games.hasOwnProperty(item)) {
            continue;
        }

        for (const character in games[item].characters) {
            if (!games[item].characters.hasOwnProperty(character)) {
                continue;
            }

            result.push(games[item].characters[character].name.toLowerCase());
        }
    }

    return uniq(result);
})();

const CharactersBlock = charactersList.map((item) =>
    (
        <div style={{display: 'inline-block', margin: '10px'}} key={item}>
            <Character onClick={action(`Click ${item}`)} name={item} id={`id_${item}`} />
        </div>
    )
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
                        list: Object.keys(games),
                        currentGame: '',
                        finished: false,
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
