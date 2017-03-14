
/**
 * ## Imports
 *
 * The actions supported
 */
import {
  TEST_ACTION,
  TEST_IMMUTABLE,
  JUMP,
} from './actionTypes'

import {Actions} from 'react-native-router-flux'

/**
 * ## set the sessionToken
 *
 */
export function testAction (payload) {
  return {
    type: TEST_ACTION,
    payload,
  }
}

export function jump (payload) {
  return {
    type: JUMP,
    payload,
  }
}

export function testImmutable (payload) {
  return {
    type: TEST_IMMUTABLE,
    payload,
  }
}
