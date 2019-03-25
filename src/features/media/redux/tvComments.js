import {
    MEDIA_TV_COMMENTS_BEGIN,
    MEDIA_TV_COMMENTS_SUCCESS,
    MEDIA_TV_COMMENTS_FAILURE,
    MEDIA_TV_COMMENTS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function tvComments(title) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_TV_COMMENTS_BEGIN,
        });

        return fetch(`https://ss-media-middle.herokuapp.com/tv_show=${title}/comments`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: MEDIA_TV_COMMENTS_SUCCESS,
                    data: createdJson.comments,
                });
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_TV_COMMENTS_FAILURE,
                    data: error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTvCommentsError() {
    return {
        type: MEDIA_TV_COMMENTS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_TV_COMMENTS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            tvCommentsPending: true,
            tvCommentsError: null,
        };

    case MEDIA_TV_COMMENTS_SUCCESS:
        // The request is success
        return {
            ...state,
            tvCommentsPending: false,
            tvCommentsError: null,
            comments: action.data,
        };

    case MEDIA_TV_COMMENTS_FAILURE:
        // The request is failed
        return {
            ...state,
            tvCommentsPending: false,
            tvCommentsError: action.data.error,
        };

    case MEDIA_TV_COMMENTS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            tvCommentsError: null,
        };

    default:
        return state;
    }
}
