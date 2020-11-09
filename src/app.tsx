import 'types/css-modules';
import './style.styl';

/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */
import { render } from 'react-dom';
import store from 'store';
import { Provider } from 'react-redux';
import routes from 'router/routes';
import games from 'games';

// Redux
import * as gameActions from 'flux/game';

store.dispatch(gameActions.init(Object.keys(games)));

render(<Provider store={store}>{routes}</Provider>, document.querySelector('#app'));
