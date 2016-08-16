import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'

import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp/>
      </Provider>
    )
  }
}
