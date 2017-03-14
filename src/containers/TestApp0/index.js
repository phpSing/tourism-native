
import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Platform,
    Text } from 'react-native'
/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {
    Router,
    Scene} from 'react-native-router-flux'


/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
    Provider,
    connect,} from 'react-redux'

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from '../../configureStore'
/**
 * ## States
 * Renke explicitly defines initial state
 *
 */
import initialState from './state'
// reducer
import reducer from './reducers'

import TestApp from './TestApp'

class rootElement extends Component {

  render() {

    const store = configureStore(initialState, reducer)

    return (

      <Provider store={store}>

        <Router sceneStyle={{ backgroundColor: 'white' }}>

          <Scene key='root' hideNavBar>

            <Scene key='TestApp'
              component={TestApp}
              type='replace'
              initial />

          </Scene>

        </Router>

      </Provider>
    )
  }
}



export default rootElement
