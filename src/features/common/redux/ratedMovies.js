import {
    COMMON_RATED_MOVIES_BEGIN,
    COMMON_RATED_MOVIES_SUCCESS,
    COMMON_RATED_MOVIES_FAILURE,
    COMMON_RATED_MOVIES_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function ratedMovies(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_RATED_MOVIES_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/movie_list`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_RATED_MOVIES_SUCCESS,
                    data: createdJson.movie_list.rated_movies,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_RATED_MOVIES_FAILURE,
                    data: error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissRatedMoviesError() {
    return {
        type: COMMON_RATED_MOVIES_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_RATED_MOVIES_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            ratedMoviesPending: true,
            ratedMoviesError: null,
        };

    case COMMON_RATED_MOVIES_SUCCESS:
        // The request is success
        return {
            ...state,
            ratedMoviesPending: false,
            ratedMoviesError: null,
            ratedMovies: action.data,
        };

    case COMMON_RATED_MOVIES_FAILURE:
        // The request is failed
        return {
            ...state,
            ratedMoviesPending: false,
            ratedMoviesError: action.data.error,
        };

    case COMMON_RATED_MOVIES_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            ratedMoviesError: null,
        };

    default:
        return state;
    }
}
