import {
    COMMON_IS_SLOT_DELETABLE_BEGIN,
    COMMON_IS_SLOT_DELETABLE_SUCCESS,
    COMMON_IS_SLOT_DELETABLE_FAILURE,
    COMMON_IS_SLOT_DELETABLE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function isSlotDeletable(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_IS_SLOT_DELETABLE_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com//is_slot_deletable/user=${id}`)
            .then(response => response.json())
            .then((createdJson) => {
                dispatch({
                    type: COMMON_IS_SLOT_DELETABLE_SUCCESS,
                    data: createdJson.is_slot_deletable,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_IS_SLOT_DELETABLE_FAILURE,
                    error,
                });
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissIsSlotDeletableError() {
    return {
        type: COMMON_IS_SLOT_DELETABLE_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_IS_SLOT_DELETABLE_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            isSlotDeletablePending: true,
            isSlotDeletableError: null,
        };

    case COMMON_IS_SLOT_DELETABLE_SUCCESS:
        // The request is success
        return {
            ...state,
            isSlotDeletablePending: false,
            isSlotDeletableError: null,
            isSlotDeletable: action.data,
        };

    case COMMON_IS_SLOT_DELETABLE_FAILURE:
        // The request is failed
        return {
            ...state,
            isSlotDeletablePending: false,
            isSlotDeletableError: action.data.error,
        };

    case COMMON_IS_SLOT_DELETABLE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            isSlotDeletableError: null,
        };

    default:
        return state;
    }
}
