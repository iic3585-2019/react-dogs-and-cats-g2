import React from 'react';

// Stylesheets
import './App.css';

// Components
import { Provider } from 'react-redux';
import Routes from './Routes';

import store from './store';

export default () => (
  <Provider store={store}>
    <div>
      <Routes />
    </div>
  </Provider>
);
