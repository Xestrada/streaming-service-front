import {
  COMMON_SENT_FRIEND_REQUEST_BEGIN,
  COMMON_SENT_FRIEND_REQUEST_SUCCESS,
  COMMON_SENT_FRIEND_REQUEST_FAILURE,
  COMMON_SENT_FRIEND_REQUEST_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function sentFriendRequest(id, fid) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_SENT_FRIEND_REQUEST_BEGIN,
    });

    return fetch(`https://videovaultusers.herokuapp.com/has_friend_request/user=${fid}/friend=${id}`)
    .then(response => response.json())
    .then((createdJson) => {
        console.log(createdJson);
        dispatch({
            type: COMMON_SENT_FRIEND_REQUEST_SUCCESS,
            data: createdJson.has_friend_request,
        });
    })
    .catch((error) => {
        dispatch({
            type: COMMON_SENT_FRIEND_REQUEST_FAILURE,
            error,
        });
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSentFriendRequestError() {
  return {
    type: COMMON_SENT_FRIEND_REQUEST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SENT_FRIEND_REQUEST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        sentFriendRequestPending: true,
        sentFriendRequestError: null,
      };

    case COMMON_SENT_FRIEND_REQUEST_SUCCESS:
      // The request is success
      return {
        ...state,
        sentFriendRequestPending: false,
        sentFriendRequestError: null,
        sentFriendRequest: action.data,
      };

    case COMMON_SENT_FRIEND_REQUEST_FAILURE:
      // The request is failed
      return {
        ...state,
        sentFriendRequestPending: false,
        sentFriendRequestError: action.error,
      };

    case COMMON_SENT_FRIEND_REQUEST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        sentFriendRequestError: null,
      };

    default:
      return state;
  }
}
