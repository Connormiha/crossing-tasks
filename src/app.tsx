import './style.styl';

/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */
import {render} from 'react-dom';
import store from 'store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PagePlay from 'components/page/Play';
import PageEntry from 'components/page/Entry';
import games from 'games';

// Redux
import * as gameActions from 'flux/game';

document.addEventListener("DOMContentLoaded", () => {
    store.dispatch(gameActions.init(Object.keys(games)));

    render(
        (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={PageEntry} />
                        <Route path="/play/:id/" exact component={PagePlay} />
                    </Switch>
                </Router>
            </Provider>
        ),
        document.querySelector('#app')
    );
});
