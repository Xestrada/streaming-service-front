import {
    COMMON_UPDATE_USER_MEDIA_BEGIN,
    COMMON_UPDATE_USER_MEDIA_SUCCESS,
    COMMON_UPDATE_USER_MEDIA_FAILURE,
    COMMON_UPDATE_USER_MEDIA_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function updateUserMedia(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_UPDATE_USER_MEDIA_BEGIN,
        });

        return fetch('https://videovaultusers.herokuapp.com/database_update', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ user_id: id }),
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.success) {
                    dispatch({
                        type: COMMON_UPDATE_USER_MEDIA_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: COMMON_UPDATE_USER_MEDIA_FAILURE,
                        error: createdJson,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_UPDATE_USER_MEDIA_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissUpdateUserMediaError() {
    return {
        type: COMMON_UPDATE_USER_MEDIA_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_UPDATE_USER_MEDIA_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            updateUserMediaPending: true,
            updateUserMediaError: null,
        };

    case COMMON_UPDATE_USER_MEDIA_SUCCESS:
        // The request is success
        return {
            ...state,
            updateUserMediaPending: false,
            updateUserMediaError: null,
        };

    case COMMON_UPDATE_USER_MEDIA_FAILURE:
        // The request is failed
        return {
            ...state,
            updateUserMediaPending: false,
            updateUserMediaError: action.error,
        };

    case COMMON_UPDATE_USER_MEDIA_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            updateUserMediaError: null,
        };

    default:
        return state;
    }
}
