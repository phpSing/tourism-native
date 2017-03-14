import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  Picker,
  Alert
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import SimplePicker from 'react-native-simple-picker'

import * as actions from '../../actions'
import Loader from '../../../../components/Loader'
import { Format } from '../../../../utils/tool'

var CalendarPicker = require('../../../../components/CalendarPicker')

import styles from './styles'

class Main extends Component {
  constructor(props) {
    super(props);
    let currentDate=new Date()
    this.state = { 
      date: new Date(),
      lastMonth:new Date(currentDate.getFullYear()+'/'+currentDate.getMonth()+'/'+currentDate.getDate()),
      currentMonth:'本月',
      isShowMonth:false,
      currentDate
    }
  }

  componentDidMount() {
    const { getManHourList, clearTempManHour, getDropdownlist } = this.props
    const { currentDate } = this.state
    this.setNavigotorBar()
  
    getManHourList(Format(currentDate, 'yyyy-MM'))
    clearTempManHour()
    getDropdownlist()
  }

  onDateChange = (date) => {
    const { jump, manHourListInfo } = this.props
        const { today, days } = this.props.manHourListInfo
    let manHourIndex = -1
    let tempDate = Format(date, 'yyyy-MM-dd')
    if (manHourListInfo && manHourListInfo.list && manHourListInfo.list.length > 0) {
      manHourListInfo.list.map((ele, index) => {
        if (ele.workingDate == tempDate) {
          manHourIndex = index
       }
     })
    }
    if (new Date(manHourListInfo.today) < date) {
      Alert.alert(
        '系统提示',
        '填报工时日期不能大于:' + manHourListInfo.today, [{
          text: '确认'
        }]
      )
    } else {
      if (manHourIndex >= 0) {
        jump('Detail', { manHourIndex: manHourIndex })
      } else {
        jump('Detail', { addDate: tempDate })
      }
    }

    
  }

  selectMonthCallback = option => {
    //todo 优化数据读取，只读一次
    const { getManHourList } = this.props
    const { lastMonth } = this.state
    this.setState({
      currentMonth: option
    }, () => {
      this.setNavigotorBar()
    })
    if (option == '上个月') {
      this.setState({
        date: lastMonth  
     }, () => {
        getManHourList(lastMonth.getFullYear() + '-' + (lastMonth.getMonth() + 1))
     })
    } else {
      this.setState({
        date: new Date()
      })
    }
  }

  setNavigotorBar = () => {
    const { goBack } = this.props
    const { currentMonth } = this.state 
    Actions.refresh({
     rightTitle: currentMonth,
     rightButtonImage: require('../../assets/downArrow.png'),
     onRight: () => { this.refs['selectMonth'].show() },
     onLeft: () => goBack(true, this),
     onBack: () => goBack(true, this),
     rightButtonTextStyle: styles.navigatorText,
     rightButtonIconStyle: styles.navigatorIcon
   })
  }

  renderDropDownList(ref,options,callback) {
    return (
      <SimplePicker
        confirmText='确定'
        cancelText='取消'
        ref={ref}
        options={ ['本月','上个月'] }
        onSubmit={(option)=>{ 
          callback(option)
        }}
      /> 
    )
  }

  renderLoader(){
    const { isFetching } = this.props
    return (
      <Loader visible={ isFetching } />
    )
  }

  render() {
    const { manHourListInfo } =this.props
    return (
      <View>
        <CalendarPicker 
          selectedDate = { this.state.date }
          onDateChange = { this.onDateChange }
          screenWidth = { Dimensions.get('window').width }
          selectedDayColor = { '#999' }
          customTextList = { manHourListInfo.list }
        />

        { this.renderDropDownList('selectMonth',['本月','上个月'],this.selectMonthCallback) }
        { this.renderLoader() }
      </View>
      
    )
  }
}

//todo 精简引用的数据
const mapStateToProps = state => ({...state})
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)

