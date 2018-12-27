/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PagePlay from 'components/page/play';
import PageEntry from 'components/page/entry';
import NotFound from 'components/page/not-found';

const ROOT_URL = process.env.ROOT_URL;

export default (
    <Router basename={`/${ROOT_URL}`}>
        <Switch>
            <Route path="/" exact component={PageEntry} />
            <Route path="/play/:id/" exact component={PagePlay} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);
