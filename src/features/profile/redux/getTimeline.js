import {
    PROFILE_GET_TIMELINE_BEGIN,
    PROFILE_GET_TIMELINE_SUCCESS,
    PROFILE_GET_TIMELINE_FAILURE,
    PROFILE_GET_TIMELINE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getTimeline(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: PROFILE_GET_TIMELINE_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/timeline`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: PROFILE_GET_TIMELINE_SUCCESS,
                    timeline: createdJson.timeline,
                });
            })
            .catch((error) => {
                dispatch({
                    type: PROFILE_GET_TIMELINE_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetTimelineError() {
    return {
        type: PROFILE_GET_TIMELINE_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case PROFILE_GET_TIMELINE_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            getTimelinePending: true,
            getTimelineError: null,
        };

    case PROFILE_GET_TIMELINE_SUCCESS:
        // The request is success
        return {
            ...state,
            getTimelinePending: false,
            getTimelineError: null,
            timeline: action.timeline,
        };

    case PROFILE_GET_TIMELINE_FAILURE:
        // The request is failed
        return {
            ...state,
            getTimelinePending: false,
            getTimelineError: action.error,
        };

    case PROFILE_GET_TIMELINE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            getTimelineError: null,
        };

    default:
        return state;
    }
}
