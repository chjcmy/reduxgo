import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddlewaare from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './redux/reducers';
import rootSaga from './redux/sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddlewaare();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];
// eslint-disable-next-line no-underscore-dangle
const devtools = window.__REDUX_DEVTOOLS_EXTENSTION_COMPOSE__;

const composeEnhancer = process.env.NODE_ENV === 'production' ? compose : devtools || compose;

const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares)),
);
sagaMiddleware.run(rootSaga);

export default store;
