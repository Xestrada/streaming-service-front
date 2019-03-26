import {
    MEDIA_MAKE_MOVIE_COMMENT_BEGIN,
    MEDIA_MAKE_MOVIE_COMMENT_SUCCESS,
    MEDIA_MAKE_MOVIE_COMMENT_FAILURE,
    MEDIA_MAKE_MOVIE_COMMENT_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function makeMovieComment(info = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_MAKE_MOVIE_COMMENT_BEGIN,
        });

        const values = JSON.stringify(info);

        return fetch('https://videovaultusers.herokuapp.com/movie/comment', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: values,
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.success) {
                    dispatch({
                        type: MEDIA_MAKE_MOVIE_COMMENT_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: MEDIA_MAKE_MOVIE_COMMENT_FAILURE,
                        error: 'unsuccessful',
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_MAKE_MOVIE_COMMENT_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissMakeMovieCommentError() {
    return {
        type: MEDIA_MAKE_MOVIE_COMMENT_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_MAKE_MOVIE_COMMENT_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            makeMovieCommentPending: true,
            makeMovieCommentError: null,
        };

    case MEDIA_MAKE_MOVIE_COMMENT_SUCCESS:
        // The request is success
        return {
            ...state,
            makeMovieCommentPending: false,
            makeMovieCommentError: null,
        };

    case MEDIA_MAKE_MOVIE_COMMENT_FAILURE:
        // The request is failed
        return {
            ...state,
            makeMovieCommentPending: false,
            makeMovieCommentError: action.error,
        };

    case MEDIA_MAKE_MOVIE_COMMENT_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            makeMovieCommentError: null,
        };

    default:
        return state;
    }
}
