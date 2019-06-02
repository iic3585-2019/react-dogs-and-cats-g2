import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './views/Home';
import Animals from './containers/Animals/Animals.js';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/animals" exact component={Animals} />
  </Switch>
);
