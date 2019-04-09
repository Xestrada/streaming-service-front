import {
    MEDIA_GET_USER_RATING_BEGIN,
    MEDIA_GET_USER_RATING_SUCCESS,
    MEDIA_GET_USER_RATING_FAILURE,
    MEDIA_GET_USER_RATING_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getUserRating(isMovie, id, mid) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_GET_USER_RATING_BEGIN,
        });

        const mediaType = isMovie ? 'movie' : 'tv_show';

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/${mediaType}=${mid}/rating`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: MEDIA_GET_USER_RATING_SUCCESS,
                    userRating: createdJson[`${mediaType}_rating`],
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: MEDIA_GET_USER_RATING_FAILURE,
                    data: error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetUserRatingError() {
    return {
        type: MEDIA_GET_USER_RATING_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_GET_USER_RATING_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            getUserRatingPending: true,
            getUserRatingError: null,
        };

    case MEDIA_GET_USER_RATING_SUCCESS:
        // The request is success
        return {
            ...state,
            getUserRatingPending: false,
            getUserRatingError: null,
            userRating: action.userRating,
        };

    case MEDIA_GET_USER_RATING_FAILURE:
        // The request is failed
        return {
            ...state,
            getUserRatingPending: false,
            getUserRatingError: action.data,
        };

    case MEDIA_GET_USER_RATING_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            getUserRatingError: null,
        };

    default:
        return state;
    }
}
