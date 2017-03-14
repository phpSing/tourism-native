'use strict'
import React, { Component } from 'react'
import { AppRegistry, View, Image, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import SimplePicker from 'react-native-simple-picker'
import { Actions } from 'react-native-router-flux'

import _ from 'lodash'

import * as actions from '../../actions'
import styles from './styles'

const defaultValue = {
  workingType: '加班',
  projectName: '请选择项目',
  fieldName: '请选择领域'
}

class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        workingType: defaultValue.workingType,
        workingHours: '',
        remarks: '',
        projectVO: {
          projectName: defaultValue.projectName
        },
        fieldVO: {
          fieldName: defaultValue.fieldName
        }
      },
      dropdownlistData: {},
      fieldList: [],
      projectList: [],
      manhourType: ['加班', '日常']
    }
  }

  componentDidMount() {
    let { dropdownlist, hourModifyIndex, temp, jump } = this.props
    this.setState({
      dropdownlistData: dropdownlist
    })
    this.filterField()
    if (typeof(hourModifyIndex) == 'number') {
      let currentHour = _.cloneDeep(temp.hourList[hourModifyIndex])
      currentHour.workingType = currentHour.workingType == 1 ? '日常' : '加班'
      this.setState({
        formData: currentHour
      },()=>{
        this.filterProject(this.state.formData.fieldVO.fieldName)
      })
    }
    
    Actions.refresh({
      rightTitle: '保存',
      onRight: () => {
        this.handleSave()
      },
      onBack: () => {
        this.jumpDetail()
      },
      rightButtonTextStyle: { color: '#f92a8a' }
    })
  }

  //过滤领域数据，生成下拉框能够识别的格式
  filterField() {
    const field = this.props.dropdownlist
    let fieldList = this.state.fieldList
    if (field && field.data && field.data.field && field.data.field.length > 0) {
      field.data.field.map((ele) => {
        fieldList.push(ele.fieldName)
      })
    }
    this.setState({
      fieldList: fieldList
    })
  }

  //过滤项目数据，生成下拉框能够识别的格式
  //官网有bug,单列数据时，第二个参数pickedIndex为空，此处暂时用第一个参数处理
  filterProject(fieldName) {
    const field = this.props.dropdownlist

    let projectList = []
    if (field && field.data && field.data.field) {
      field.data.field.map((ele) => {
        if (ele.fieldName == fieldName) {
          ele.projects.map((childEle) => {
            projectList.push(childEle.pojectName)
          })
        }
      })
    }
    this.setState({
      projectList: projectList
    })
  }

  // 显示下拉框
  showDropDownList(ref) {
    if(this.state.formData.fieldVO.fieldName==defaultValue.fieldName&&ref=='projectDropDownList'){
      Alert.alert(
        '系统提示',
        '请先选择领域', [
          {
            text: '确认'
          }
        ]
      )
    } else {
      this.refs[ref].show()
    }
  }

  // 验证数据是否满足添加条件
  validateData = () => {
    if (this.state.formData.fieldVO.fieldName == defaultValue.fieldName) {
      Alert.alert(
        '系统提示',
        defaultValue.fieldName, [
          {
            text: '确认'
          }
        ]
      )
      return false
    }
    if (this.state.formData.projectVO.projectName == defaultValue.projectName) {
      Alert.alert(
        '系统提示',
        defaultValue.projectName, [
          {
            text: '确认'
          }
        ]
      )
      return false
    }
    if (this.state.formData.workingHours == '') {
      Alert.alert(
        '系统提示',
        '请填写工时', [
          {
            text: '确认'
          }
        ]
      )
      return false
    }
    return true
  }

  //增加或者修改工时
  handleSave = () => {
    if (this.validateData()) {
      const { addDetailItem, modifyDetailItem, hourModifyIndex } = this.props
      let { formData } = this.state
      formData.workingType = formData.workingType == '加班' ? 2 : 1

      if (hourModifyIndex >= 0) {
        modifyDetailItem({ data: formData, index: hourModifyIndex }, this.jumpDetail)
      } else {
        addDetailItem(formData, this.jumpDetail)
      }
    }
  }

  jumpDetail = () => {
    const { jump, manHourIndex,addDate } = this.props
    let tempManHourIndex = +manHourIndex >= 0 ? +manHourIndex : -1
    //noLoadData 当打开detail时，会去读取数据，但是此处填完数据还没有存储，会导致读取数据后，冲掉还没有存储的数据
    jump('Detail', { manHourIndex: tempManHourIndex, noLoadData:true,addDate:addDate })

  }

  jumpRemark = () => {
    if (this.validateData()) {
      const { jump, addDetailItem, modifyDetailItem, hourModifyIndex,manHourIndex,temp,addDate } = this.props
      let { formData } = this.state
      if (hourModifyIndex >= 0) {
        modifyDetailItem({ data: formData, index: hourModifyIndex }, () => { jump('Remark', { hourModifyIndex: hourModifyIndex,manHourIndex:manHourIndex,addDate:addDate }) })
      } else {
        addDetailItem(formData, () => { jump('Remark', { hourModifyIndex: temp.hourList.length,manHourIndex:manHourIndex,addDate:addDate}) })
      }
    }
  }

  handleManHourChangeText = (value) => {
    let { formData } = this.state
    if(value!=''&&(+value>24 || +value<=0)){
      Alert.alert(
        '系统提示',
        '工时必须介于0-24小时之间', [
          {
            text: '确认'
          }
        ]
      )
      formData.workingHours=''
    }else{
      formData.workingHours = value
    }
    
    this.setState({
      formData: formData
    })
  }

  fieldDropDownListCallback = (option) => {
    let formData = _.cloneDeep(this.state.formData)
    formData.fieldVO = !!formData.fieldVO ? formData.fieldVO : {}
    formData.projectVO = !!formData.projectVO ? formData.projectVO : {} 
    formData.fieldVO.fieldName = option
    formData.projectVO.projectName = '请选择项目'
    this.setState({
      formData: formData
    })
    this.filterProject(option)
  }

  projectDropDownListCallback = (option) => {
    let { formData } = this.state
    formData.projectVO = !!formData.projectVO ? formData.projectVO : {} 
    formData.projectVO.projectName = option
    this.setState({
      formData: formData
    })
  }

  manHourTypeDropDownListCallback = (option) => {
    let { formData } = this.state
    formData.workingType = option
    this.setState({
      formData: formData
    })
  }

  renderDropDownList(ref,options,callback) {
    return (
      <SimplePicker
        confirmText='确定'
        cancelText='取消'
        ref={ ref }
        options={ options }
        onSubmit={(option)=>{ 
          callback(option)
        }}
      /> 
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.label}>领域</Text>
            <TouchableOpacity onPress={() => { this.showDropDownList('fieldDropDownList') }}>
              <View style={styles.value} >
                <Text>{this.state.formData.fieldVO.fieldName}</Text>
                <Image style={styles.arrow} source={require('../../assets/arrow.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <Image style={styles.border} source={require('../../assets/border.jpg')} />
        </View>
        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.label}>项目</Text>
            <TouchableOpacity onPress={() => { this.showDropDownList('projectDropDownList') }}>            
              <View style={styles.value}>
                <Text>{this.state.formData.projectVO.projectName}</Text>
                 <Image style={styles.arrow} source={require('../../assets/arrow.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <Image style={styles.border} source={require('../../assets/border.jpg')} />
        </View>
        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.label}>工时类型</Text>
            <TouchableOpacity onPress={() => { this.showDropDownList('manhourTypeDropDownList') }}>   
              <View style={styles.value}>
                <Text>{this.state.formData.workingType}</Text>
                 <Image style={styles.arrow} source={require('../../assets/arrow.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <Image style={styles.border} source={require('../../assets/border.jpg')} />
        </View>
        <View style={styles.item}>
          <View style={styles.content}>        
            <Text style={styles.label}>工时</Text>
            <View style={styles.value}>
              <TextInput keyboardType={'numeric'} onChangeText={this.handleManHourChangeText}   style={styles.workingHour} value={this.state.formData.workingHours}></TextInput>
            </View>
          </View>
          <Image style={styles.border} source={require('../../assets/border.jpg')} />
        </View>
        <View style={styles.item}>
          <TouchableOpacity onPress={() => { this.jumpRemark() }}>   
            <View style={styles.content}>
              <Text style={styles.label}>备注</Text>
              <View style={styles.value}>
                <Text numberOfLines={1}>{this.state.formData.remarks}</Text>
                 <Image style={styles.arrow} source={require('../../assets/arrow.png')} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        { this.renderDropDownList('fieldDropDownList',this.state.fieldList,this. fieldDropDownListCallback) }
        { this.renderDropDownList('projectDropDownList',this.state.projectList,this. projectDropDownListCallback) }
        { this.renderDropDownList('manhourTypeDropDownList',this.state.manhourType,this. manHourTypeDropDownListCallback) }        
      </View>
    )
  }
}

const mapStateToProps = state => ({...state})
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Editor)

