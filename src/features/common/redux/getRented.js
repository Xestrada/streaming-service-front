import {
    COMMON_GET_RENTED_BEGIN,
    COMMON_GET_RENTED_SUCCESS,
    COMMON_GET_RENTED_FAILURE,
    COMMON_GET_RENTED_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getRented(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_GET_RENTED_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/rented_movies`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_GET_RENTED_SUCCESS,
                    data: createdJson.user_rented_movies,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_GET_RENTED_FAILURE,
                    data: error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetRentedError() {
    return {
        type: COMMON_GET_RENTED_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_GET_RENTED_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            getRentedPending: true,
            getRentedError: null,
        };

    case COMMON_GET_RENTED_SUCCESS:
        // The request is success
        return {
            ...state,
            getRentedPending: false,
            getRentedError: null,
            rentedMovies: action.data,
        };

    case COMMON_GET_RENTED_FAILURE:
        // The request is failed
        return {
            ...state,
            getRentedPending: false,
            getRentedError: action.data.error,
        };

    case COMMON_GET_RENTED_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            getRentedError: null,
        };

    default:
        return state;
    }
}
