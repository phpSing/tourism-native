'use strict'

/**
 * ## Imports
 *
 * React
*/
import React, {PropTypes, Component} from 'react'

import
{
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

class TestComponent extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          我只是个公共组件
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
})

export default TestComponent
