// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import FindMatchPage from './containers/FindMatchPage';
import TablePage from './containers/TablePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/table/:username/:match_id" component={TablePage} />
    <Route path="/findmatch/:username" component={FindMatchPage} />
  </Route>
);
