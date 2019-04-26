import {
    MEDIA_IS_UNSUBBED_BEGIN,
    MEDIA_IS_UNSUBBED_SUCCESS,
    MEDIA_IS_UNSUBBED_FAILURE,
    MEDIA_IS_UNSUBBED_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function isUnsubbed(id, mid) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_IS_UNSUBBED_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/is_unsubscribed/user_id=${id}/tv_show_id=${mid}`)
            .then(response => response.json())
            .then((createdJson) => {
                console.log(createdJson);
                dispatch({
                    type: MEDIA_IS_UNSUBBED_SUCCESS,
                    data: createdJson.is_unsubscribed,
                });
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_IS_UNSUBBED_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissIsUnsubbedError() {
    return {
        type: MEDIA_IS_UNSUBBED_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_IS_UNSUBBED_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            isUnsubbedPending: true,
            isUnsubbedError: null,
        };

    case MEDIA_IS_UNSUBBED_SUCCESS:
        // The request is success
        return {
            ...state,
            isUnsubbedPending: false,
            isUnsubbedError: null,
            isUnsubbed: action.data,
        };

    case MEDIA_IS_UNSUBBED_FAILURE:
        // The request is failed
        return {
            ...state,
            isUnsubbedPending: false,
            isUnsubbedError: action.error,
        };

    case MEDIA_IS_UNSUBBED_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            isUnsubbedError: null,
        };

    default:
        return state;
    }
}
