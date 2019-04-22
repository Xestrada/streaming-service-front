import {
    PROFILE_POST_TIMELINE_BEGIN,
    PROFILE_POST_TIMELINE_SUCCESS,
    PROFILE_POST_TIMELINE_FAILURE,
    PROFILE_POST_TIMELINE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function postTimeline(info = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: PROFILE_POST_TIMELINE_BEGIN,
        });

        const content = JSON.stringify(info);

        return fetch('https://videovaultusers.herokuapp.com/timeline/post', {
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
                        type: PROFILE_POST_TIMELINE_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: PROFILE_POST_TIMELINE_FAILURE,
                        error: createdJson.valid_friend,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: PROFILE_POST_TIMELINE_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissPostTimelineError() {
    return {
        type: PROFILE_POST_TIMELINE_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case PROFILE_POST_TIMELINE_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            postTimelinePending: true,
            postTimelineError: null,
        };

    case PROFILE_POST_TIMELINE_SUCCESS:
        // The request is success
        return {
            ...state,
            postTimelinePending: false,
            postTimelineError: null,
        };

    case PROFILE_POST_TIMELINE_FAILURE:
        // The request is failed
        return {
            ...state,
            postTimelinePending: false,
            postTimelineError: action.error,
        };

    case PROFILE_POST_TIMELINE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            postTimelineError: null,
        };

    default:
        return state;
    }
}
