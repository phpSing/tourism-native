import Immutable from 'seamless-immutable'
import { NativeModules, findNodeHandle } from 'react-native'
import { Actions } from 'react-native-router-flux'
import actionTypes from './actionTypes'
import initialState from './state'

const { KidswantReactNativeBridgeModule: nativeBridge } = NativeModules

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    // send request
    case actionTypes.REQUEST_START: {
      return Immutable.merge(state, { isFetching : true })
    }
    case actionTypes.REQUEST_END: {
      return Immutable.merge(state, { isFetching : false })
    }
    // jump to the specific scene by scene name
    case actionTypes.PAGE_JUMP: {
      const { scene, option } = payload
      Actions[scene](option)
      break
    }
    // 触发app的拦截器+
    case actionTypes.APP_LINK: {
      const { command, handle } = payload
      nativeBridge.linkAction(`https://api.haiziwang.com?cmd=${command}`, findNodeHandle(handle))
      break
    }
    case actionTypes.GO_BACK: {
      const { animate = true, handle } = payload
      nativeBridge.hzwGoBackAnimated(animate, findNodeHandle(handle))
      break
    }
    // 进入页面埋点
    case actionTypes.TRACK_ENTER: {
      nativeBridge.hzwBeginLogPageView(payload)
      break
    }
    // 离开页面埋点
    case actionTypes.TRACK_LEAVE: {
      nativeBridge.hzwEndLogPageView(payload)
      break
    }
    // 事件埋点
    case actionTypes.TRACK_EVENT: {
      nativeBridge.hzwLogEvent(payload)
      break
    }
    // 定位获取地址
    case actionTypes.ADDRESS_GET: {
      return Immutable.merge(state, { address: payload })
    }
    // State reset
    case actionTypes.RESET: {
      return initialState
    }
    // 登录信息
    case actionTypes.LOGIN: {
      return Immutable.merge(state, { loginInfo: payload })
    }
    // 工时列表
    case actionTypes.ACTION_GET_MANHOUR_LIST: {
      let manHourListInfo=state.manHourListInfo
      manHourListInfo=manHourListInfo.setIn(['today'],payload.today)
      manHourListInfo=manHourListInfo.setIn(['days'],payload.days)
      if(payload.pageIndex==1){
        manHourListInfo= manHourListInfo.setIn(['list'],payload.list)
      }else{
        manHourListInfo= manHourListInfo.setIn(['list'],manHourListInfo.list.concat(payload.list))
      }
      return Immutable.updateIn(Immutable.merge(state,[{isModify:false}]),['manHourListInfo'],()=>Immutable(manHourListInfo))
    }
    // 更新数据
    case actionTypes.ACTION_GET_MAN_HOUR_DETAIL: {
      let data={
        hourList: payload.newData.hourList,
        detail: {
          key: payload.oldData.hourDate,
          value: payload.newData.hourList
        },
        temp: {
          hourDate: payload.oldData.hourDate,
          hourAdress: payload.oldData.hourAdress,
          hourList: payload.newData.hourList
        }
      }
      return Immutable.updateIn(Immutable.merge(state, { hourList: data.hourList, temp: data.temp }), ['detail', data.detail.key], () => data.detail.value)
    }
    //删除工时
    case actionTypes.DELETE_DETAIL_ITEM: {
      const arr = Immutable.asMutable(state.temp.hourList)
      arr.splice(payload, 1)
      return Immutable.updateIn(state, ['temp', 'hourList'], () => Immutable(arr))
    }
    // 增加工时
    case actionTypes.ADD_DETAIL_ITEM: {
      const arr = Immutable.asMutable(state.temp.hourList)
      arr.push(payload)
      return Immutable.updateIn(Immutable.merge(state,[{isModify:true}]), ['temp', 'hourList'], () => Immutable(arr))
    }
    // 修改工时
    case actionTypes.MODIFY_DETAIL_ITEM: {
      let arr = Immutable.asMutable(state.temp.hourList)
      arr[payload.index] = payload.data
      return Immutable.updateIn(Immutable.merge(state,[{isModify:true}]), ['temp', 'hourList'], () => Immutable(arr))
    }
    // 清空工时
    case actionTypes.CLEAR_HOUR_LIST: {
      return Immutable.updateIn(state, ['temp', 'hourList'], [])
    }
    // 修改工时列表
    case actionTypes.MODIFY_HOUR_LIST: {
      return Immutable.merge(state, payload)
    }
    // 修改（提交）工时成功
    case actionTypes.SUBMIT_HOUR_DETAIL: {

      return Immutable.updateIn(Immutable.merge(state, { hourList: payload.hourList }), ['detail', payload.key], () => payload.value)
    }
    // 修改地址
    case actionTypes.MODIFY_DETAIL_ADRESS: {
      return Immutable.updateIn(state, ['temp', 'hourAdress'], () => payload)
    }
    // 修改日期
    case actionTypes.MODIFY_DETAIL_DATE: {
      return Immutable.updateIn(state, ['temp', 'hourDate'], () => payload)
    }
    case actionTypes.GET_DROPDOWNLIST: {
      return Immutable.merge(state, {dropdownlist: payload })
    }
    // 清空临时数据
    case actionTypes.CLEAR_TEMP_HOUR_LIST:{
      return Immutable.updateIn(state, ['temp'], () => {
        return {
          hourDate: '', 
          hourAdress: '', 
          hourList: [] 
        }
      })
    }
    case actionTypes.DELETE_MAN_HOUR_BY_WORKING_DATE:{
      let newList=[]
      if(state.list&&state.list.length>0){
      
        state.list.map((ele,index)=>{
          if(ele.workingDate!=payload.date){
            newList.push(ele)
          }
        })
      }
      return Immutable.updateIn(state,['list'],() => newList) 
    }
  }
  return state
}
