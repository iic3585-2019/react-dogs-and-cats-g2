
import { createStore } from 'redux';

// Reducers
import rootReducer from './reducers';

const REDUX_DEVTOOLS_EXTENSION = '__REDUX_DEVTOOLS_EXTENSION__';

export default createStore(
  rootReducer,
  window[REDUX_DEVTOOLS_EXTENSION] && window[REDUX_DEVTOOLS_EXTENSION]()
);
