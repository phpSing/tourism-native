import React, { Component } from 'react'
import Immutable from 'seamless-immutable'
import {
  StyleSheet,
  Alert,
  View,
  Button,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import DatePicker from 'react-native-datepicker'

import Loader from '../../../../components/Loader'
import * as actions from '../../actions'
import a from '../../assets/date.png'
import styles from './styles'

class Detail extends Component {
  constructor(props) {
    super(props)
    const {
      manHourListInfo,
      manHourIndex,
      addDate
    } = props
    this.state = {
      factorDate: +manHourIndex >=0 ? manHourListInfo.list[manHourIndex].workingDate : addDate,
      addDate:addDate,
      isEdit:false
    }
  }

  componentDidMount() {
    const {
      manHourIndex,
      modifyHourList,
      detail,
      temp,
      jump,
      getLocationAddress,
      getManHourDetail,
      manHourListInfo,
      noLoadData
    } = this.props
    getLocationAddress()
    if (!Number.isNaN(+manHourIndex) && +manHourIndex >=0 ) {
      // noLoadData:默认要读，即这个值为false, 当打开detail时，会去读取数据，但是此处填完数据还没有存储，会导致读取数据后，冲掉还没有存储的数据
      const hourDate = manHourListInfo.list[manHourIndex].workingDate,
      hourAdress = manHourListInfo.list[manHourIndex].address
      !noLoadData&&!!getManHourDetail && getManHourDetail({
        hourDate,
        hourAdress
      })
    }

    let isEdit =+ manHourIndex >=0 ? !!manHourListInfo.list[manHourIndex] && manHourListInfo.list[manHourIndex].isEdit : this.validateDate() ? true : false
    
    this.setState({
      isEdit
    })
    if(isEdit==true){
      let self=this
      Actions.refresh({
        rightTitle: '保存',
        onRight: () => {
          self.handleSubmit()
        },
        onBack: () => {
          if(self.props.isModify){
            Alert.alert(
              '系统提示',
              '检测到您有数据未保存，确认返回吗', [{
                text: '确认',
                onPress: () => {
                  Actions.Main()
                }
              }, { text: '取消', onPress: () => {} }]
            )  
          }else{
            jump('Main')
          }
        },
        rightButtonTextStyle: { color: '#f92a8a' }
      })
    }
  }

  // 判断当前日期是可以修改，新增
  validateDate = () => {
    const { today, days } = this.props.manHourListInfo
    const { addDate } = this.props
    if (today && days && addDate) {
      let currentDate = new Date(today)
      if (currentDate - new Date(addDate) <= (days - 1) * 24 * 3600 * 1000) {
        return true
      }
    }
    return false
  }

  render() {
    const {
      manHourListInfo,
      jump,
      temp,
      isFetching,
      manHourIndex,
      address
    } = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.queryFactor}>
          <View style={styles.factor}>
            <View style={styles.factorLabel}>
              <Text style={styles.factorLabelText}>日期</Text>
            </View>
            <View style={styles.factorContent}>
              <Text style={styles.fantorContentText}>{this.state.factorDate}</Text>
              {
                !manHourIndex && (
                  <View style={styles.factorDatePicker}>
                    <DatePicker
                      duration={300}
                      minDate={this.translateDateFormate(new Date() - 6 * 24 * 3600 * 1000)}
                      maxDate={this.translateDateFormate(new Date())}
                      onDateChange={date => this.handleDateChoiced(date)}
                    />
                  </View>
                )
              }
            </View>
            <View>
              <Text/>
              <Image style={[styles.factorContentIcon, styles.factorContentIcon1]} source={require('../../assets/date.png')}/>
              <Image style={[styles.factorContentIcon, styles.factorContentIcon2]} source={require('../../assets/point.png')}/>
            </View>
          </View>
          <View style={[styles.factor, styles.factorBorderNone]}>
            <View style={styles.factorLabel}>
              <Text style={styles.factorLabelText}>定位</Text>
            </View>
            <View style={styles.factorContent}>
              <Text style={styles.fantorContentText} numberOfLines={1}>{address}</Text>
            </View>
            <View>
              <Text/>
              <Image style={[styles.factorContentIcon, styles.factorContentIcon1]} source={require('../../assets/address.png')}/>
              <Image style={[styles.factorContentIcon, styles.factorContentIcon2]} source={require('../../assets/point.png')}/>
            </View>
          </View>
        </View>
        <View style={styles.detailWrap}>
          <View style={styles.detailTitle}>
            <View style={styles.detailTitleContent}>
              <Text style={styles.detailTitleText}>工作明细</Text>
            </View>
            {
              this.state.isEdit && (
                <TouchableOpacity style={styles.detailTitleIcon} onPress={() => jump('Editor',{ manHourIndex: manHourIndex,addDate:this.state.addDate})}>
                  <Text/>
                  <Image style={styles.detailTitleIconContent} source={require('../../assets/add.png')}/>
                </TouchableOpacity>
              )
            }
          </View>
          {this.renderHourList()}
        </View>
        <Loader visible={isFetching}/>
      </ScrollView>
    )
  }

  // 渲染工时详情
  renderHourList = () => {
    const {
      hourList,
      manHourListInfo,
      manHourIndex,
      temp,
      jump
    } = this.props
    // const isEdit = !!manHourIndex ? !!manHourListInfo.list[manHourIndex] && manHourListInfo.list[manHourIndex].isEdit : this.validateDate()?true:false
    if ((this.state.isEdit && temp.hourList.length < 1) || (!this.state.isEdit && hourList < 1)) {
      return null
    }
    return (!manHourIndex ? temp.hourList : this.state.isEdit ? temp.hourList : hourList).map((ele, index) => {
      return (
        <View style={styles.detailContent} key={index}>
          <View style={styles.detailContentTitle}>
            <Text style={styles.detailContentTitleLabel}>{`${ele.fieldVO.fieldName || '无领域'}-${ele.projectVO.projectName || '无项目'}-${ele.workingType == 1 ? '日常' : '加班'}`}</Text>
            <Text style={[styles.detailContentTitleText, styles.textAlignRight, styles.detailContentTitleNormal]}>{`${ele.workingType == 1 ? '日常' : '加班'}${ele.workingHours}小时`}</Text>
          </View>
          <View style={styles.detailContentList}>
            <Text style={styles.detailContentListText}>{ele.remarks}</Text>
          </View>
          {
            this.state.isEdit && (
              <View style={styles.detailContentButtonWrap}>
                <TouchableOpacity style={styles.detailContentButton} onPress={() => jump('Editor', {manHourIndex: manHourIndex,hourModifyIndex: index})}>
                  <Text style={styles.detailContentButtonText}>编辑</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.detailContentButton, styles.detailContentDelete]} onPress={() => this.handleDeleteTempManHourDetail(index)}>
                  <Text style={styles.detailContentButtonText}>删除</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      )
    })
  }

  // 时间格式转换
  translateDateFormate = date => {
    let newDate = new Date(date),
    dateArr = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()]
    dateArr[1] = dateArr[1] < 10 ? '0' + dateArr[1] : dateArr[1]
    dateArr[2] = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
    return dateArr.join('-')
  }

  // 时间选择后回调，判断列表中是否已有日期，有则报错
  handleDateChoiced = date => {
    const {
      manHourListInfo,
      manHourIndex,
      modifyDetailDate
    } = this.props
    for (let i = 0; i < manHourListInfo.list.length; i++) {
      if (manHourListInfo.list[i].workingDate == date) {
        return
      }
    }
    this.setState({
      factorDate: date,
      addDate:date
    }, () => {
      !!modifyDetailDate && modifyDetailDate(date)
    })
  }

  // 处理删除工时数据
  handleDeleteTempManHourDetail = index => {
    Alert.alert(
      '系统提示',
      '确认删除吗', [{
        text: '确认',
        onPress: () => {
          const {
            temp,
            deleteDetailItem
          } = this.props
          !!deleteDetailItem && deleteDetailItem(index)
        }
      }, { text: '取消', onPress: () => {} }]
    )

  }

  // 保存
  handleSubmit = () => {
    const {
      manHourIndex,
      submitHourDetail,
      temp,
      jump,
      address
    } = this.props
    if (!manHourIndex && !this.state.factorDate) {
      return Alert.alert(
        '系统提示',
        '请选择日期', [{ text: '确认', onPress: () => {} }]
      )
    }
    let hourList=this.transData()
    if(hourList.length<=0){
      Alert.alert(
        '系统提示',
        '您还未填写工时详情', [{ text: '确认', onPress: () => {} }]
      )
      return 
    }
    let totalHour=0
    hourList.map( (ele) => {
      totalHour += +ele.workingHours
    })
    if (totalHour > 24 ){
      Alert.alert(
        '系统提示',
        '检测到您填写的工时总数超过24小时，请重新填写', [{ text: '确认', onPress: () => {} }]
      )    
      return
    }
    console.log('hourList:',hourList)
    submitHourDetail(manHourIndex<0 ? 'add' : 'update', {
      workingDate: this.state.factorDate,
      address: address,
      workHourDetailList: hourList
    }, () => { jump('Main') })
  }

  // 跳转到首页
  jumpMain = () => {
    const { jump } =this.props
    jump('Main')
  }

  // 转换数据
  transData() {
    const { temp, dropdownlist } = this.props
    let hourList = []

    for (var i = 0, len = temp.hourList.length; i < len; i++) {
      var tempData = {}
      var currentField=dropdownlist.data.field.filter(function(ele) {
        return ele.fieldName == temp.hourList[i].fieldVO.fieldName
      })[0]
      tempData.fieldId=currentField.fieldId
      tempData.projectId = currentField.projects.filter(function(ele) {
        return ele.pojectName == temp.hourList[i].projectVO.projectName
      })[0].projectId
      tempData.remark = temp.hourList[i].remarks
      tempData.workingType = temp.hourList[i].workingType
      tempData.workingHours = temp.hourList[i].workingHours
      hourList.push(tempData)
    }
    return hourList
  }
}

const mapStateToProps = state => ({...state })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
