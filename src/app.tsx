import './style.styl';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {render} from 'react-dom';
import store from 'store';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import PagePlay from 'components/page/Play';
import PageEntry from 'components/page/Entry';
import games from 'games';

// Redux
import * as gameActions from 'flux/game';

document.addEventListener("DOMContentLoaded", () => {
    store.dispatch(gameActions.init(Object.keys(games)));

    render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={PageEntry} />
                <Route path="/play/:id/" component={PagePlay} />
            </Router>
        </Provider>,
        document.querySelector('#app')
    );
});
