import React, { Component } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import * as reducers from '../reducers';
import Application from './App';

const logger = createLogger();
const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store} >
        <Application />
      </Provider>
    );
  }
}