import {
    COMMON_ACTORS_BEGIN,
    COMMON_ACTORS_SUCCESS,
    COMMON_ACTORS_FAILURE,
    COMMON_ACTORS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getActors() {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_ACTORS_BEGIN,
        });

        return fetch('https://ss-media-middle.herokuapp.com/actors')
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_ACTORS_SUCCESS,
                    data: createdJson,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_ACTORS_FAILURE,
                    error,
                });
                console.log('Error: ', error);
            });

    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissActorsError() {
    return {
        type: COMMON_ACTORS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_ACTORS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            actorsPending: true,
            actorsError: null,
        };

    case COMMON_ACTORS_SUCCESS:
        // The request is success
        return {
            ...state,
            actorsPending: false,
            actorsError: null,
            actors: action.data.actors,
        };

    case COMMON_ACTORS_FAILURE:
        // The request is failed
        return {
            ...state,
            actorsPending: false,
            actorsError: action.error,
        };

    case COMMON_ACTORS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            actorsError: null,
        };

    default:
        return state;
    }
}
