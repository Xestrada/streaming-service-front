import {
    COMMON_ADD_FRIEND_BEGIN,
    COMMON_ADD_FRIEND_SUCCESS,
    COMMON_ADD_FRIEND_FAILURE,
    COMMON_ADD_FRIEND_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function addFriend(info = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_ADD_FRIEND_BEGIN,
        });

        const values = JSON.stringify(info);

        return fetch('https://videovaultusers.herokuapp.com/send_friend_request', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: values,
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.success) {
                    dispatch({
                        type: COMMON_ADD_FRIEND_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: COMMON_ADD_FRIEND_FAILURE,
                        error: createdJson,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_ADD_FRIEND_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAddFriendError() {
    return {
        type: COMMON_ADD_FRIEND_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_ADD_FRIEND_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            addFriendPending: true,
            addFriendError: null,
        };

    case COMMON_ADD_FRIEND_SUCCESS:
        // The request is success
        return {
            ...state,
            addFriendPending: false,
            addFriendError: null,
        };

    case COMMON_ADD_FRIEND_FAILURE:
        // The request is failed
        return {
            ...state,
            addFriendPending: false,
            addFriendError: action.error,
        };

    case COMMON_ADD_FRIEND_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            addFriendError: null,
        };

    default:
        return state;
    }
}
