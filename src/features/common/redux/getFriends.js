import {
    COMMON_GET_FRIENDS_BEGIN,
    COMMON_GET_FRIENDS_SUCCESS,
    COMMON_GET_FRIENDS_FAILURE,
    COMMON_GET_FRIENDS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getFriends(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_GET_FRIENDS_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/friends`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_GET_FRIENDS_SUCCESS,
                    data: createdJson.friends,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_GET_FRIENDS_FAILURE,
                    data: error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetFriendsError() {
    return {
        type: COMMON_GET_FRIENDS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_GET_FRIENDS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            getFriendsPending: true,
            getFriendsError: null,
        };

    case COMMON_GET_FRIENDS_SUCCESS:
        // The request is success
        return {
            ...state,
            getFriendsPending: false,
            getFriendsError: null,
            friends: action.data,
        };

    case COMMON_GET_FRIENDS_FAILURE:
        // The request is failed
        return {
            ...state,
            getFriendsPending: false,
            getFriendsError: action.data.error,
        };

    case COMMON_GET_FRIENDS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            getFriendsError: null,
        };

    default:
        return state;
    }
}
