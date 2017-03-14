import React, {Component,PropTypes} from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native'

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    left: 0,
    top: Dimensions.get('window').height / 2 - 82
  }
})

export default class Loader extends Component {
    render() {
      const { visible } = this.props;
      return visible ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="#000"
        />
      ) : null
    }
}

Loader.propTypes = {
  visible: PropTypes.bool //是否显示
}

Loader.defaultProps = {
  visible: false //默认不显示
}
