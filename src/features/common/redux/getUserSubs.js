import {
    COMMON_GET_USER_SUBS_BEGIN,
    COMMON_GET_USER_SUBS_SUCCESS,
    COMMON_GET_USER_SUBS_FAILURE,
    COMMON_GET_USER_SUBS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getUserSubs(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_GET_USER_SUBS_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/subscriptions`)
            .then(response => response.json())
            .then((createdJson) => {
                console.log(createdJson);
                dispatch({
                    type: COMMON_GET_USER_SUBS_SUCCESS,
                    data: createdJson.subscriptions,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_GET_USER_SUBS_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetUserSubsError() {
    return {
        type: COMMON_GET_USER_SUBS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_GET_USER_SUBS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            getUserSubsPending: true,
            getUserSubsError: null,
        };

    case COMMON_GET_USER_SUBS_SUCCESS:
        // The request is success
        return {
            ...state,
            getUserSubsPending: false,
            getUserSubsError: null,
            userSubs: action.data,
        };

    case COMMON_GET_USER_SUBS_FAILURE:
        // The request is failed
        return {
            ...state,
            getUserSubsPending: false,
            getUserSubsError: action.error,
        };

    case COMMON_GET_USER_SUBS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            getUserSubsError: null,
        };

    default:
        return state;
    }
}
