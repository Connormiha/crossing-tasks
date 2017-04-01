/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PagePlay from 'components/page/Play';
import PageEntry from 'components/page/Entry';

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={PageEntry} />
            <Route path="/play/:id/" exact component={PagePlay} />
        </Switch>
    </Router>
);
