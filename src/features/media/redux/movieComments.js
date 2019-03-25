import {
    MEDIA_MOVIE_COMMENTS_BEGIN,
    MEDIA_MOVIE_COMMENTS_SUCCESS,
    MEDIA_MOVIE_COMMENTS_FAILURE,
    MEDIA_MOVIE_COMMENTS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function movieComments(title) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_MOVIE_COMMENTS_BEGIN,
        });

        return fetch(`https://ss-media-middle.herokuapp.com/movie=${title}/comments`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: MEDIA_MOVIE_COMMENTS_SUCCESS,
                    data: createdJson.comments,
                });
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_MOVIE_COMMENTS_FAILURE,
                    data: error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissMovieCommentsError() {
    return {
        type: MEDIA_MOVIE_COMMENTS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_MOVIE_COMMENTS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            movieCommentsPending: true,
            movieCommentsError: null,
        };

    case MEDIA_MOVIE_COMMENTS_SUCCESS:
        // The request is success
        return {
            ...state,
            movieCommentsPending: false,
            movieCommentsError: null,
            comments: action.data,
        };

    case MEDIA_MOVIE_COMMENTS_FAILURE:
        // The request is failed
        return {
            ...state,
            movieCommentsPending: false,
            movieCommentsError: action.data.error,
        };

    case MEDIA_MOVIE_COMMENTS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            movieCommentsError: null,
        };

    default:
        return state;
    }
}
