import {
  PROFILE_CLEAR_USER_PROFILE_BEGIN,
  PROFILE_CLEAR_USER_PROFILE_SUCCESS,
  PROFILE_CLEAR_USER_PROFILE_FAILURE,
  PROFILE_CLEAR_USER_PROFILE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function clearUserProfile(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: PROFILE_CLEAR_USER_PROFILE_BEGIN,
    });

    dispatch({
      type: PROFILE_CLEAR_USER_PROFILE_SUCCESS,
    });

  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissClearUserProfileError() {
  return {
    type: PROFILE_CLEAR_USER_PROFILE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PROFILE_CLEAR_USER_PROFILE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        clearUserProfilePending: true,
        clearUserProfileError: null,
      };

    case PROFILE_CLEAR_USER_PROFILE_SUCCESS:
      // The request is success
      return {
        ...state,
        clearUserProfilePending: false,
        clearUserProfileError: null,
        wall: undefined,
        timeline: undefined,
      };

    case PROFILE_CLEAR_USER_PROFILE_FAILURE:
      // The request is failed
      return {
        ...state,
        clearUserProfilePending: false,
        clearUserProfileError: action.data.error,
      };

    case PROFILE_CLEAR_USER_PROFILE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        clearUserProfileError: null,
      };

    default:
      return state;
  }
}
