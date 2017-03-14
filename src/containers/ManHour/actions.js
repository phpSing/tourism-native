import { Alert,NativeModules } from 'react-native'
import { Actions } from 'react-native-router-flux'

import actionTypes from './actionTypes'
import fetchData from '../../utils/fetch'
import cookie from '../../utils/cookie'
import { 
  LOGIN, GET_MAN_HOUR_LIST, 
  GET_MAN_HOUR_DETAIL, 
  SUBMIT_DETAIL_UPDATE, 
  GET_DROPDOWNLIST
} from '../../constant/api'

const { KidswantReactNativeBridgeModule: nativeBridge } = NativeModules

// 开始请求
function requestStart() { 
  return {
    type: actionTypes.REQUEST_START
  }
}

// 结束请求
function requestEnd() { 
  return {
    type: actionTypes.REQUEST_END
  }
}

// jump to the specific scene by payload
export function jump(scene, option) {
  return {
    type: actionTypes.PAGE_JUMP,
    payload: {
      scene,
      option
    }
  }
}

// execute the command of app link
export function appLink(command, handle) {
  return {
    type: actionTypes.APP_LINK,
    payload: {
      command,
      handle
    }
  }
}

// close RN container
export function goBack(animate, handle) {
  return {
    type: actionTypes.GO_BACK,
    payload: {
      animate,
      handle
    }
  }
}

export function trackEnter(payload) {
  return {
    type: actionTypes.TRACK_ENTER,
    payload
  }
}

export function trackLeave(payload) {
  return {
    type: actionTypes.TRACK_LEAVE,
    payload
  }
}

export function trackEvent(payload) {
  return {
    type: actionTypes.TRACK_EVENT,
    payload
  }
}

export function getLocationAddress() {
  return async(dispatch, getState) => {
    dispatch(requestStart())
    await nativeBridge.hzwStartUpdateLocation((err, data) => {
      if (data && data.length > 0) {
        dispatch({
          type: actionTypes.ADDRESS_GET,
          payload: data[0]
        })
      }
    })
    dispatch(requestEnd())
  }
}

//新增工时时，删除某一条工时
export function deleteDetailItem(payload) {
  return {
    type: actionTypes.DELETE_DETAIL_ITEM,
    payload
  }
}

export function modifyDetailItem(payload, callback = () => {}) {
  return async(dispatch, getState) => {
    dispatch({
      type: actionTypes.MODIFY_DETAIL_ITEM,
      payload
    })
    callback()
  }
}

//新增工时，添加一条工时
export function addDetailItem(payload, callback = () => {}) {
  return async(dispatch, getState) => {
    dispatch({
      type: actionTypes.ADD_DETAIL_ITEM,
      payload
    })
    callback()
  }
}

//更新修改工时列表
export function modifyHourList(payload) {
  return {
    type: actionTypes.MODIFY_HOUR_LIST,
    payload
  }
}

//修改地址
export function modifyDetailAddress(payload) {
  return {
    type: actionTypes.MODIFY_DETAIL_ADRESS,
    payload
  }
}

// 修改日期
export function modifyDetailDate(payload) {
  return {
    type: actionTypes.MODIFY_DETAIL_DATE,
    payload
  }
}

// 清空temp中的工时
export function clearTempManHour() {
  return {
    type: actionTypes.CLEAR_TEMP_HOUR_LIST
  }
}

// fetch manhour list
export function getManHourList(monthTime) {
  return async(dispatch, getState) => {
    dispatch(requestStart())
    let response = await fetchData(GET_MAN_HOUR_LIST, { monthTime: monthTime })
    dispatch(requestEnd())
    if (response.code == 10000) {
      return dispatch({
        type: actionTypes.ACTION_GET_MANHOUR_LIST,
        payload: response.data
      })
    } else {
      Alert.alert(
        '系统提示',
        response.msg, [{ text: '确认', onPress: () => {} }]
      )
    }
  }
}

// Get manhour detail
export function getManHourDetail(data) {
  return async(dispatch, getState) => {
    dispatch(requestStart())
    let response = await fetchData(GET_MAN_HOUR_DETAIL, { workingDate: data.hourDate })
    dispatch(requestEnd())
    if (response.code == 10000) {
      return dispatch({
        type: actionTypes.ACTION_GET_MAN_HOUR_DETAIL,
        payload:{
          oldData:data,
          newData:response.data
        }
      })
    } else {
      Alert.alert(
        '系统提示',
        response.msg, [{ text: '确认', onPress: () => {} }]
      )
    }
  }
}

export function submitHourDetail(type, data) {
  return async(dispatch, getState) => {
    dispatch(requestStart())
    let response = await fetchData(`${SUBMIT_DETAIL_UPDATE}?type=${type}`, data, { method: 'POST' })
    dispatch(requestEnd())
    if (response.code == 10000) {
      dispatch({
        type: actionTypes.SUBMIT_HOUR_DETAIL,
        payload: {
          hourList: getState().temp.hourList,
          detail: {
            key: data.workingDate,
            value: getState().temp.hourList
          }
        }
      })
      Alert.alert(
        '系统提示',
        '保存工时成功', [{
          text: '确认',
          onPress: () => {
            Actions.Main()
          }
        }]
      )
    } else {
      Alert.alert(
        '系统提示',
        response.msg, [{ text: '确认', onPress: () => {} }]
      )
    }
  }
}

//获取下拉框信息
export function getDropdownlist() {
  return async(dispatch, getState) => {
    const response = await fetchData(GET_DROPDOWNLIST)
    if (response.code == 10000) {
      return dispatch({
        type: actionTypes.GET_DROPDOWNLIST,
        payload: response
      })
    } else {
      Alert.alert(
        '系统提示',
        response.msg, [{ text: '确认', onPress: () => {} }]
      )
    }
  }
}
