import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home.js';

export default () => (
  <Switch>
    <Route path="/dogs" exact component={Home} />
  </Switch>
);
