import {
    COMMON_HAS_ALL_SLOTS_BEGIN,
    COMMON_HAS_ALL_SLOTS_SUCCESS,
    COMMON_HAS_ALL_SLOTS_FAILURE,
    COMMON_HAS_ALL_SLOTS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function hasAllSlots(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_HAS_ALL_SLOTS_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/user=${id}/is_slots_full`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_HAS_ALL_SLOTS_SUCCESS,
                    data: createdJson.is_slots_full,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_HAS_ALL_SLOTS_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissHasAllSlotsError() {
    return {
        type: COMMON_HAS_ALL_SLOTS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_HAS_ALL_SLOTS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            hasAllSlotsPending: true,
            hasAllSlotsError: null,
        };

    case COMMON_HAS_ALL_SLOTS_SUCCESS:
        // The request is success
        return {
            ...state,
            hasAllSlotsPending: false,
            hasAllSlotsError: null,
            areSlotsFull: action.data,
        };

    case COMMON_HAS_ALL_SLOTS_FAILURE:
        // The request is failed
        return {
            ...state,
            hasAllSlotsPending: false,
            hasAllSlotsError: action.error,
        };

    case COMMON_HAS_ALL_SLOTS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            hasAllSlotsError: null,
        };

    default:
        return state;
    }
}
