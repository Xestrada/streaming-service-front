import {
    PROFILE_COMMENT_POST_BEGIN,
    PROFILE_COMMENT_POST_SUCCESS,
    PROFILE_COMMENT_POST_FAILURE,
    PROFILE_COMMENT_POST_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function commentPost(info = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: PROFILE_COMMENT_POST_BEGIN,
        });

        const content = JSON.stringify(info);

        return fetch('https://videovaultusers.herokuapp.com/timeline/post/comment', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: content,
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.success !== undefined && createdJson.success) {
                    dispatch({
                        type: PROFILE_COMMENT_POST_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: PROFILE_COMMENT_POST_FAILURE,
                        error: createdJson.valid_friend,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: PROFILE_COMMENT_POST_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissCommentPostError() {
    return {
        type: PROFILE_COMMENT_POST_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case PROFILE_COMMENT_POST_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            commentPostPending: true,
            commentPostError: null,
        };

    case PROFILE_COMMENT_POST_SUCCESS:
        // The request is success
        return {
            ...state,
            commentPostPending: false,
            commentPostError: null,
        };

    case PROFILE_COMMENT_POST_FAILURE:
        // The request is failed
        return {
            ...state,
            commentPostPending: false,
            commentPostError: action.error,
        };

    case PROFILE_COMMENT_POST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            commentPostError: null,
        };

    default:
        return state;
    }
}
