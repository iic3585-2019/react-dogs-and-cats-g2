import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Home from './views/Home';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
);
