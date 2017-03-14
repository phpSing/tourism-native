import React, { Component } from 'react'
import {
  Alert,
  Button,
  View,
  Image,
  ListView,
  Text,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Swiper from 'react-native-swiper'
import Immutable from 'seamless-immutable'

import * as actions from '../../actions'
import styles from './styles'

class FirstPage extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(props.dataList)
    }
  }

  componentDidUpdate() {
    console.log('Tutorial did updated')
    console.log(this.props)
  }

  componentDidMount() {
    fetch('https://cms.haiziwang.com/page/997/config/26.json')
  }

  render() {
    const { appLink, goBack, pageNo, jump } = this.props
    return (
      <View style={styles.container}>
        {this.renderSwiper()}
        <Text>Query Params: {JSON.stringify(Immutable.asMutable(this.props.query, { deep: true }))}</Text>
        <Text>Page NO: {pageNo}</Text>

        <View style={styles.btnView}>
          <Button
            title="Login Jump"
            onPress={() => appLink('login', this)}
          />
        </View>
        <View style={styles.btnView}>
          <Button
            title="RN CLOSE"
            color="#841584"
            onPress={() => goBack(false, this)}
          />
        </View>
        <View style={styles.btnView}>
          <Button
            title="Goto SecondPage"
            color="#841584"
            onPress={() => jump('SecondPage')}
          />
        </View>
        <Button
          title="Show Alert"
          color="#841584"
          onPress={() => Alert.alert(
            '',
            '网络异常！',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderDataRow}
          renderSeparator={this.renderSeparator}
        />
      </View>
    )
  }

  // render the top swiper
  renderSwiper() {
    return (
      <Swiper height={180} autoplay={true} >
        <View style={styles.slide1}>
          <Text style={styles.swiperText}>Hello React</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.swiperText}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.swiperText}>Simple</Text>
        </View>
      </Swiper>
    )
  }

  // render each data row
  renderDataRow = (data, sectionId, rowId, highlightRow) => {
    const { jump } = this.props
    return (
      <TouchableHighlight onPress={() => {
        highlightRow(sectionId, rowId)
        jump('SecondPage')
      }}>
        <View style={styles.row} >
          <Image style={styles.thumb} source={require('../../assets/icon_logo.png')} />
          <Text style={styles.text}>
            {data}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  // render the separator below each row but not the last row
  renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionId}-${rowId}`}
        style={{
          height: 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
        }}
      />
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage)
