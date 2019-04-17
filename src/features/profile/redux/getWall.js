import {
    PROFILE_GET_WALL_BEGIN,
    PROFILE_GET_WALL_SUCCESS,
    PROFILE_GET_WALL_FAILURE,
    PROFILE_GET_WALL_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getWall(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: PROFILE_GET_WALL_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/wall`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: PROFILE_GET_WALL_SUCCESS,
                    wall: createdJson.wall,
                });
            })
            .catch((error) => {
                dispatch({
                    type: PROFILE_GET_WALL_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetWallError() {
    return {
        type: PROFILE_GET_WALL_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case PROFILE_GET_WALL_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            getWallPending: true,
            getWallError: null,
        };

    case PROFILE_GET_WALL_SUCCESS:
        // The request is success
        return {
            ...state,
            getWallPending: false,
            getWallError: null,
            wall: action.wall,
        };

    case PROFILE_GET_WALL_FAILURE:
        // The request is failed
        return {
            ...state,
            getWallPending: false,
            getWallError: action.error,
        };

    case PROFILE_GET_WALL_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            getWallError: null,
        };

    default:
        return state;
    }
}
