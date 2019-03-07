import {
    COMMON_TV_SHOWS_BEGIN,
    COMMON_TV_SHOWS_SUCCESS,
    COMMON_TV_SHOWS_FAILURE,
    COMMON_TV_SHOWS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getTV() {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_TV_SHOWS_BEGIN,
        });

        return (dispatch) => { // optionally you can have getState as the second argument
            dispatch({
                type: COMMON_TV_SHOWS_BEGIN,
            });

            return fetch('https://ss-media-middle.herokuapp.com/tv_shows')
                .then(response => response.json())
                .then((createdJson) => {
                    dispatch({
                        type: COMMON_TV_SHOWS_SUCCESS,
                        data: createdJson,
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: COMMON_TV_SHOWS_FAILURE,
                        data: error,
                    });
                    console.log('Error: ', error);
                });

        };
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTvShowsError() {
    return {
        type: COMMON_TV_SHOWS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_TV_SHOWS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            tvShowsPending: true,
            tvShowsError: null,
        };

    case COMMON_TV_SHOWS_SUCCESS:
        // The request is success
        return {
            ...state,
            tvShowsPending: false,
            tvShowsError: null,
            tvShows: action.data.tv_shows,
        };

    case COMMON_TV_SHOWS_FAILURE:
        // The request is failed
        return {
            ...state,
            tvShowsPending: false,
            tvShowsError: action.data.error,
        };

    case COMMON_TV_SHOWS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            tvShowsError: null,
        };

    default:
        return state;
    }
}
