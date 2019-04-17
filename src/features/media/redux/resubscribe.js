import {
    MEDIA_RESUBSCRIBE_BEGIN,
    MEDIA_RESUBSCRIBE_SUCCESS,
    MEDIA_RESUBSCRIBE_FAILURE,
    MEDIA_RESUBSCRIBE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function resubscribe(uid, id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_RESUBSCRIBE_BEGIN,
        });

        return fetch('https://videovaultusers.herokuapp.com/subscribe', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: uid,
                tv_show_id: id,
            }),
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.is_success !== undefined && createdJson.is_success) {
                    dispatch({
                        type: MEDIA_RESUBSCRIBE_SUCCESS,

                    });
                } else {
                    dispatch({
                        type: MEDIA_RESUBSCRIBE_FAILURE,
                        error: createdJson.is_slot_exist,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_RESUBSCRIBE_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissResubscribeError() {
    return {
        type: MEDIA_RESUBSCRIBE_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_RESUBSCRIBE_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            resubscribePending: true,
            resubscribeError: null,
        };

    case MEDIA_RESUBSCRIBE_SUCCESS:
        // The request is success
        return {
            ...state,
            resubscribePending: false,
            resubscribeError: null,
        };

    case MEDIA_RESUBSCRIBE_FAILURE:
        // The request is failed
        return {
            ...state,
            resubscribePending: false,
            resubscribeError: action.error,
        };

    case MEDIA_RESUBSCRIBE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            resubscribeError: null,
        };

    default:
        return state;
    }
}
