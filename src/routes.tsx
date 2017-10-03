/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PagePlay from 'components/page/Play';
import PageEntry from 'components/page/Entry';
import NotFound from 'components/page/NotFound';

export default (
    <Router basename={`/${process.env.ROOT_URL}`}>
        <Switch>
            <Route path="/" exact component={PageEntry} />
            <Route path="/play/:id/" exact component={PagePlay} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);
