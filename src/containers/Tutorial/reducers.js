import { NativeModules, findNodeHandle } from 'react-native'
import { Actions } from 'react-native-router-flux'
import actionTypes from './actionTypes'
import initialState from './state'

const { KidswantReactNativeBridgeModule: nativeBridge } = NativeModules
/**
 * Reducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    // jump to the specific scene by scene name
    case actionTypes.PAGE_JUMP: {
      const { scene, option } = payload
      Actions[scene](option)
      break
    }
    // 触发app的拦截器
    case actionTypes.APP_LINK: {
      const { command, handle } = payload
      nativeBridge.linkAction(`http://api.haiziwang.com?cmd=${command}`, findNodeHandle(handle))
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
    case actionTypes.RESET:
      return initialState
  }
  return state
}
