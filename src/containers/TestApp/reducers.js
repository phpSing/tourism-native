/**
 * ## Imports
 * The initialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
import initialState from './state'
/**
 * ## Auth actions
 */
import {
  TEST_ACTION,
  JUMP,
  TEST_IMMUTABLE,
} from './actionTypes'
import Immutable from 'seamless-immutable'
import { Actions } from 'react-native-router-flux'

/**
 * ## testReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function testReducer (state = initialState, action) {

  switch (action.type) {
    /**
     * ### Auth form field change
     *
     * Set the form's field with the value
     * Clear the forms error
     * Pass the fieldValidation results to the
     * the formValidationimport Immutable from 'seamless-immutable'
     */
    case TEST_ACTION:
      return Object.assign({}, state, {
        testStateKey: action.payload
      })

    case JUMP:
      Actions[action.payload.scene](action.payload.data)

    case TEST_IMMUTABLE:
      return state.setIn(['immutableObject', 'tim'], action.payload)
  }
  /**
   * ## Default
   */
  return state
}
