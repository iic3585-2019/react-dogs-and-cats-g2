import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dogs from './containers/Dogs/Dogs.js';

export default () => (
  <Switch>
    <Route path="/dogs" exact component={Dogs} />
  </Switch>
);
