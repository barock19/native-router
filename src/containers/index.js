import React, { Component } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from '../reducers';
import Application from './App';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store} >
        <Application />
      </Provider>
    );
  }
}