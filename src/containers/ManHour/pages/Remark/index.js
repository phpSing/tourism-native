import React, { Component } from 'react'
import { View,TextInput,Text} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import * as actions from '../../actions'

import styles from './styles'

class Remark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remark: '',
      formData: {}
    }
  }
  componentDidMount() {
    const { goBack, temp, jump, manHourIndex,hourModifyIndex } = this.props
    Actions.refresh({
      rightTitle: '保存',
      onRight: () => {
        this.handleSave()
      },
      onBack: () => { this.jumpEdit() },
      rightButtonTextStyle: { color: '#f92a8a' }
    })
    if (typeof(hourModifyIndex) == 'number') {
      let currentHour = temp.hourList[hourModifyIndex]
      this.setState({
        formData: _.cloneDeep(currentHour)
      })
      this.state.remark = currentHour.remarks
    }
  }


  jumpEdit = () => {
    const { jump, hourModifyIndex,manHourIndex,addDate } = this.props
    if (Object.prototype.toString.call(hourModifyIndex) == '[object Number]') {
      jump('Editor', { hourModifyIndex: hourModifyIndex,manHourIndex:manHourIndex,addDate:addDate })
    } else {
      this.addManHour()
      jump('Editor', { hourModifyIndex: 0,manHourIndex:manHourIndex,addDate:addDate })
    }

  }

  handleChangeText = (value) => {
    this.setState({
      remark: value
    })
  }

  handleSave = () => {
    const { hourModifyIndex, temp, addDetailItem, modifyDetailItem } = this.props
    let { formData } = this.state
    if (temp.hourList && temp.hourList.length > 0) {

      formData.remarks = this.state.remark
      modifyDetailItem({ data: formData, index: hourModifyIndex }, this.jumpEdit)
    } else {
      let formData = {
        workingType: '加班',
        workingHours: 0,
        remarks: this.state.remark,
        projectVO: {
          projectName: '请选择项目'
        },
        fieldVO: {
          fieldName: '请选择领域'
        }
      }
      addDetailItem(formData, this.jumpEdit)
    }
  }



  render() {
    return (
      <View style={styles.container}>
        <TextInput value={ this.state.remark } multiline={true} onChangeText={this.handleChangeText} style={styles.txt} maxLength={200} placeholder='请输入备注'></TextInput>
      </View>
    )
  }
}

const mapStateToProps = state => ({...state})
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Remark)
