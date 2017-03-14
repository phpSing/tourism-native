'use strict'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Platform,
    TouchableHighlight,
    Text } from 'react-native'
/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {
    Router
} from 'react-native-router-flux'


/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
    connect,} from 'react-redux'

import {
  bindActionCreators,
} from 'redux'
/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from '../../../../configureStore'
import * as actionCreators from '../../actions'
/**
 * ## States
 * Renke explicitly defines initial state
 *
 */
import initialState from '../../state'
// reducer
import reducer from '../../reducers'


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

class TestApp extends Component {

  componentDidUpdate() {
  }
  render() {

    let {
      testStateKey,
      testAction,
      testImmutable,
    } = this.props

    return (

      <View style={styles.container}>
        <Text style={styles.welcome} onPress={testImmutable.bind(this, 'tim mutated by immutable')}>
          { "通过immutable修改的：" + this.props.immutableObject.tim }
        </Text>
        <Text style={styles.welcome} onPress={testImmutable.bind(this, 'tim mutated by immutable')}>
          第3个页面/ 点我修改上面的immutable属性
        </Text>
        <Text style={styles.welcome} onPress={testImmutable.bind(this, 'tim mutated by immutable')}>
          设备类型为 { Platform.OS }
        </Text>

      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(TestApp)
