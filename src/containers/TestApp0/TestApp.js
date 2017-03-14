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

import {
  bindActionCreators,
} from 'redux'
/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from '../../configureStore'
import * as actionCreators from './actions'
/**
 * ## States
 * Renke explicitly defines initial state
 *
 */
import initialState from './state'
// reducer
import reducer from './reducers'


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

class TestApp extends Component {

  componentDidUpdate() {
    console.log('updaing Test App');
    console.log(this.props);
  }
  render() {

    let {
      testStateKey,
      testAction,
    } = this.props

    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>
          Test App for 人客合一
        </Text>
        <Text style={styles.instructions}>
          编辑 Containers/Test 内为一个独立模块
        </Text>
        <Text style={styles.instructions}>
          CMD+R 刷新， CMD+D 开发菜单
        </Text>
        <Text style={styles.instructions}>
          这是store里的数据testStateKey：{ this.props.testStateKey }
        </Text>
        <TouchableHighlight onPress={testAction.bind(this, 'tim改的名字')}>
          <Text>点我触发redux action改变这是store里的数据testStateKey</Text>
        </TouchableHighlight>
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
