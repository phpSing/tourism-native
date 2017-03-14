import actionTypes from './actionTypes'

export function reset(payload) {
  return {
    type: actionTypes.RESET,
    payload
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
