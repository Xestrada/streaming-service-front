import {
  COMMON_REMOVE_FRIEND_BEGIN,
  COMMON_REMOVE_FRIEND_SUCCESS,
  COMMON_REMOVE_FRIEND_FAILURE,
  COMMON_REMOVE_FRIEND_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function removeFriend(info = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_REMOVE_FRIEND_BEGIN,
    });

    const {id, fid} = info;

    return fetch(`https://videovaultusers.herokuapp.com/user=${id}/friends/remove=${fid}`, {
        method: 'DELETE',
        mode: 'cors',
    })
        .then(response => response.json()).then((createdJson) => {
            if (createdJson.friend_deleted) {
                dispatch({
                    type: COMMON_REMOVE_FRIEND_SUCCESS,
                });
            } else {
                dispatch({
                    type: COMMON_REMOVE_FRIEND_FAILURE,
                    error: createdJson,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: COMMON_REMOVE_FRIEND_FAILURE,
                error,
            });
            console.log(error);
        });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissRemoveFriendError() {
  return {
    type: COMMON_REMOVE_FRIEND_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_REMOVE_FRIEND_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        removeFriendPending: true,
        removeFriendError: null,
      };

    case COMMON_REMOVE_FRIEND_SUCCESS:
      // The request is success
      return {
        ...state,
        removeFriendPending: false,
        removeFriendError: null,
      };

    case COMMON_REMOVE_FRIEND_FAILURE:
      // The request is failed
      return {
        ...state,
        removeFriendPending: false,
        removeFriendError: action.data.error,
      };

    case COMMON_REMOVE_FRIEND_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        removeFriendError: null,
      };

    default:
      return state;
  }
}
