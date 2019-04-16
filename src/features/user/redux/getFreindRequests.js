import {
    USER_GET_FREIND_REQUESTS_BEGIN,
    USER_GET_FREIND_REQUESTS_SUCCESS,
    USER_GET_FREIND_REQUESTS_FAILURE,
    USER_GET_FREIND_REQUESTS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getFreindRequests(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: USER_GET_FREIND_REQUESTS_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/get_friend_requests/user=${id}`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: USER_GET_FREIND_REQUESTS_SUCCESS,
                    data: createdJson.friend_requests,
                });
            })
            .catch((error) => {
                dispatch({
                    type: USER_GET_FREIND_REQUESTS_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetFreindRequestsError() {
    return {
        type: USER_GET_FREIND_REQUESTS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case USER_GET_FREIND_REQUESTS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            getFreindRequestsPending: true,
            getFreindRequestsError: null,
        };

    case USER_GET_FREIND_REQUESTS_SUCCESS:
        // The request is success
        return {
            ...state,
            getFreindRequestsPending: false,
            getFreindRequestsError: null,
            friendRequests: action.data,
        };

    case USER_GET_FREIND_REQUESTS_FAILURE:
        // The request is failed
        return {
            ...state,
            getFreindRequestsPending: false,
            getFreindRequestsError: action.error,
        };

    case USER_GET_FREIND_REQUESTS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            getFreindRequestsError: null,
        };

    default:
        return state;
    }
}
