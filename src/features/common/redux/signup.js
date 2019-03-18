import {
  COMMON_SIGNUP_BEGIN,
  COMMON_SIGNUP_SUCCESS,
  COMMON_SIGNUP_FAILURE,
  COMMON_SIGNUP_DISMISS_ERROR,
} from './constants';
import { request } from 'https';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function signup(email, username, pass, cc, exp) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_SIGNUP_BEGIN,
    });

    return fetch('https://videovaultuser.herokuapp.com/signup')
    .then((response) => {
        console.log(response);
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSignupError() {
  return {
    type: COMMON_SIGNUP_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SIGNUP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signupPending: true,
        signupError: null,
      };

    case COMMON_SIGNUP_SUCCESS:
      // The request is success
      return {
        ...state,
        signupPending: false,
        signupError: null,
      };

    case COMMON_SIGNUP_FAILURE:
      // The request is failed
      return {
        ...state,
        signupPending: false,
        signupError: action.data.error,
      };

    case COMMON_SIGNUP_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signupError: null,
      };

    default:
      return state;
  }
}
