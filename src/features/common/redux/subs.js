import {
    COMMON_SUBS_BEGIN,
    COMMON_SUBS_SUCCESS,
    COMMON_SUBS_FAILURE,
    COMMON_SUBS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getSubs(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_SUBS_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/slots`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_SUBS_SUCCESS,
                    data: createdJson.user_slots.slots,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_SUBS_FAILURE,
                    data: error,
                });
            });


    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSubsError() {
    return {
        type: COMMON_SUBS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_SUBS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            subsPending: true,
            subsError: null,
            subs: undefined,
        };

    case COMMON_SUBS_SUCCESS:
        // The request is success
        return {
            ...state,
            subsPending: false,
            subsError: null,
            subs: action.data,
        };

    case COMMON_SUBS_FAILURE:
        // The request is failed
        return {
            ...state,
            subsPending: false,
            subsError: action.data,
            subs: undefined,
        };

    case COMMON_SUBS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            subsError: null,
        };

    default:
        return state;
    }
}
