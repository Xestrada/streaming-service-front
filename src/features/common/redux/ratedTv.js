import {
    COMMON_RATED_TV_BEGIN,
    COMMON_RATED_TV_SUCCESS,
    COMMON_RATED_TV_FAILURE,
    COMMON_RATED_TV_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function ratedTv(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_RATED_TV_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/tv_show_list`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_RATED_TV_SUCCESS,
                    data: createdJson.tv_show_list.rated_tv_shows,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_RATED_TV_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissRatedTvError() {
    return {
        type: COMMON_RATED_TV_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_RATED_TV_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            ratedTvPending: true,
            ratedTvError: null,
        };

    case COMMON_RATED_TV_SUCCESS:
        // The request is success
        return {
            ...state,
            ratedTvPending: false,
            ratedTvError: null,
            ratedTV: action.data,
        };

    case COMMON_RATED_TV_FAILURE:
        // The request is failed
        return {
            ...state,
            ratedTvPending: false,
            ratedTvError: action.error,
        };

    case COMMON_RATED_TV_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            ratedTvError: null,
        };

    default:
        return state;
    }
}
