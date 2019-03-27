import {
    MEDIA_RATE_TV_BEGIN,
    MEDIA_RATE_TV_SUCCESS,
    MEDIA_RATE_TV_FAILURE,
    MEDIA_RATE_TV_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function rateTv(info = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_RATE_TV_BEGIN,
        });

        const values = JSON.stringify(info);

        return fetch('https://videovaultusers.herokuapp.com/user/tv_show/rating', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: values,
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.success !== undefined && createdJson.success) {
                    dispatch({
                        type: MEDIA_RATE_TV_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: MEDIA_RATE_TV_FAILURE,
                        error: 'unsuccessful',
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_RATE_TV_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissRateTvError() {
    return {
        type: MEDIA_RATE_TV_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_RATE_TV_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            rateTvPending: true,
            rateTvError: null,
        };

    case MEDIA_RATE_TV_SUCCESS:
        // The request is success
        return {
            ...state,
            rateTvPending: false,
            rateTvError: null,
        };

    case MEDIA_RATE_TV_FAILURE:
        // The request is failed
        return {
            ...state,
            rateTvPending: false,
            rateTvError: action.data.error,
        };

    case MEDIA_RATE_TV_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            rateTvError: null,
        };

    default:
        return state;
    }
}
