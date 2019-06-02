import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dogs from './containers/Dogs/Dogs.js';
import Swiper from './containers/Swiper';

export default () => (
  <Switch>
    <Route path="/dogs" exact component={Dogs} />
    <Route path="/swiper" exact render={() => <Swiper threshold={.5} />} />
  </Switch>
);
