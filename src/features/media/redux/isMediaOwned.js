import {
    MEDIA_IS_MEDIA_OWNED_BEGIN,
    MEDIA_IS_MEDIA_OWNED_SUCCESS,
    MEDIA_IS_MEDIA_OWNED_FAILURE,
    MEDIA_IS_MEDIA_OWNED_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function isMediaOwned(url, uid, mid) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_IS_MEDIA_OWNED_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user1=${uid}/movie=${mid}/${url}`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: MEDIA_IS_MEDIA_OWNED_SUCCESS,
                    mediaOwned: createdJson[url],
                });
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_IS_MEDIA_OWNED_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissIsMediaOwnedError() {
    return {
        type: MEDIA_IS_MEDIA_OWNED_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_IS_MEDIA_OWNED_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            isMediaOwnedPending: true,
            isMediaOwnedError: null,
        };

    case MEDIA_IS_MEDIA_OWNED_SUCCESS:
        // The request is success
        return {
            ...state,
            isMediaOwnedPending: false,
            isMediaOwnedError: null,
            mediaOwned: action.mediaOwned,
        };

    case MEDIA_IS_MEDIA_OWNED_FAILURE:
        // The request is failed
        return {
            ...state,
            isMediaOwnedPending: false,
            isMediaOwnedError: action.error,
        };

    case MEDIA_IS_MEDIA_OWNED_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            isMediaOwnedError: null,
        };

    default:
        return state;
    }
}
