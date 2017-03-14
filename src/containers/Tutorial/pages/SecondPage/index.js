import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class SecondPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('Second Page did mount')
    console.log(this.props)
  }

  render() {
    const { jump, appLink, goBack } = this.props
    return (
      <View style={styles.container}>
        <Text>Second Page</Text>
        <Button
          title="Go to FirstPage"
          onPress={() => {jump('FirstPage', {pageNo: 'from second page'})}}
        />
        <Button
          title="Goback to FirstPage"
          onPress={() => {jump('FirstPage', {type:'back'})}}
        />
        <Button
          title="Login Jump"
          color="#841584"
          onPress={() => appLink('login', this)}
        />
        <Button
          title="RN CLOSE"
          color="#841584"
          onPress={() => goBack(false, this)}
        />
        <Button
          title="RN CLOSE(animation)"
          color="#841584"
          onPress={() => goBack(true, this)}
        />
      </View>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SecondPage)
