import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import Immutable from 'seamless-immutable'

import configureStore from '../../configureStore'
import initialState from './state'
import reducer from './reducers'
import FirstPage from './pages/FirstPage'
import SecondPage from './pages/SecondPage'

export default class Root extends Component {
  render() {
    // merge the query params from app entrance
    const store = configureStore(Immutable.merge(initialState, { query: this.props }), reducer)
    return (
      <Provider store={store} >
        <Router sceneStyle={{ backgroundColor: 'white' }}>
          <Scene
            key="FirstPage"
            component={FirstPage}
            hideNavBar
            initial
          />
          <Scene
            key="SecondPage"
            component={SecondPage}
            hideNavBar
          />
        </Router>
      </Provider>
    )
  }
}
