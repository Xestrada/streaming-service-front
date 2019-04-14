import {
    MEDIA_UNSUBSCRIBE_BEGIN,
    MEDIA_UNSUBSCRIBE_SUCCESS,
    MEDIA_UNSUBSCRIBE_FAILURE,
    MEDIA_UNSUBSCRIBE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function unsubscribe(uid, id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_UNSUBSCRIBE_BEGIN,
        });

        return fetch('https://videovaultusers.herokuapp.com/unsubscribe', {
            method: 'POST',
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
                        type: MEDIA_UNSUBSCRIBE_SUCCESS,

                    });
                } else {
                    dispatch({
                        type: MEDIA_UNSUBSCRIBE_FAILURE,
                        error: createdJson.is_slot_exist,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_UNSUBSCRIBE_FAILURE,
                    error,
                });
                console.log(error);
            });


    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissUnsubscribeError() {
    return {
        type: MEDIA_UNSUBSCRIBE_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_UNSUBSCRIBE_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            unsubscribePending: true,
            unsubscribeError: null,
        };

    case MEDIA_UNSUBSCRIBE_SUCCESS:
        // The request is success
        return {
            ...state,
            unsubscribePending: false,
            unsubscribeError: null,
        };

    case MEDIA_UNSUBSCRIBE_FAILURE:
        // The request is failed
        return {
            ...state,
            unsubscribePending: false,
            unsubscribeError: action.error,
        };

    case MEDIA_UNSUBSCRIBE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            unsubscribeError: null,
        };

    default:
        return state;
    }
}
