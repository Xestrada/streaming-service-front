import {
    COMMON_MEDIA_BEGIN,
    COMMON_MEDIA_SUCCESS,
    COMMON_MEDIA_FAILURE,
    COMMON_MEDIA_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getMedia(title) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_MEDIA_BEGIN,
        });
        return fetch(`https://ss-media-middle.herokuapp.com/title=${title}/info`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_MEDIA_SUCCESS,
                    data: createdJson[title],
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_MEDIA_FAILURE,
                    error,
                });
                console.log('Error: ', error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissMediaError() {
    return {
        type: COMMON_MEDIA_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_MEDIA_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            mediaPending: true,
            mediaError: null,
        };

    case COMMON_MEDIA_SUCCESS:
        // The request is success
        return {
            ...state,
            mediaPending: false,
            mediaError: null,
            media: action.data,
        };

    case COMMON_MEDIA_FAILURE:
        // The request is failed
        return {
            ...state,
            mediaPending: false,
            mediaError: action.error,
        };

    case COMMON_MEDIA_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            mediaError: null,
        };

    default:
        return state;
    }
}
