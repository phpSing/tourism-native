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
} from './actionTypes'

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
     * the formValidation
     */
    case TEST_ACTION:
      return Object.assign({}, state, {
        testStateKey: action.payload
      })

  }
  /**
   * ## Default
   */
  return state
}
