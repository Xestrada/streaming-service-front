import {
    COMMON_MOVIES_BEGIN,
    COMMON_MOVIES_SUCCESS,
    COMMON_MOVIES_FAILURE,
    COMMON_MOVIES_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getMovies() {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_MOVIES_BEGIN,
        });

        return fetch('https://ss-media-middle.herokuapp.com/movies')
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_MOVIES_SUCCESS,
                    data: createdJson,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_MOVIES_FAILURE,
                    data: error,
                });
                console.log('Error: ', error);
            });

    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissMoviesError() {
    return {
        type: COMMON_MOVIES_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_MOVIES_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            moviesPending: true,
            moviesError: null,
        };

    case COMMON_MOVIES_SUCCESS:
        // The request is success
        return {
            ...state,
            moviesPending: false,
            moviesError: null,
            movies: action.data.movies,
        };

    case COMMON_MOVIES_FAILURE:
        // The request is failed
        return {
            ...state,
            moviesPending: false,
            moviesError: action.data.error,
        };

    case COMMON_MOVIES_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            moviesError: null,
        };

    default:
        return state;
    }
}
