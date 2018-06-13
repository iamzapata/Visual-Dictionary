import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import rootReducer from 'reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk, ReduxLogger),
);

export default store;
