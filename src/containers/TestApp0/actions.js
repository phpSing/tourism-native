
/**
 * ## Imports
 *
 * The actions supported
 */
import {
  TEST_ACTION
} from './actionTypes'

import {Actions} from 'react-native-router-flux'

/**
 * ## set the sessionToken
 *
 */
export function testAction (payload) {
  console.log('doint test action');
  return {
    type: TEST_ACTION,
    payload,
  }
}
