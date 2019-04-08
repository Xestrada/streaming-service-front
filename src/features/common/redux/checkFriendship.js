import {
    COMMON_CHECK_FRIENDSHIP_BEGIN,
    COMMON_CHECK_FRIENDSHIP_SUCCESS,
    COMMON_CHECK_FRIENDSHIP_FAILURE,
    COMMON_CHECK_FRIENDSHIP_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function checkFriendship(id, fid) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_CHECK_FRIENDSHIP_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user1=${id}/user2=${fid}`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_CHECK_FRIENDSHIP_SUCCESS,
                    data: createdJson.is_friend,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_CHECK_FRIENDSHIP_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissCheckFriendshipError() {
    return {
        type: COMMON_CHECK_FRIENDSHIP_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_CHECK_FRIENDSHIP_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            checkFriendshipPending: true,
            checkFriendshipError: null,
        };

    case COMMON_CHECK_FRIENDSHIP_SUCCESS:
        // The request is success
        return {
            ...state,
            checkFriendshipPending: false,
            checkFriendshipError: null,
            areFriends: action.data,
        };

    case COMMON_CHECK_FRIENDSHIP_FAILURE:
        // The request is failed
        return {
            ...state,
            checkFriendshipPending: false,
            checkFriendshipError: action.error,
        };

    case COMMON_CHECK_FRIENDSHIP_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            checkFriendshipError: null,
        };

    default:
        return state;
    }
}
