import {
    COMMON_ADD_SLOT_BEGIN,
    COMMON_ADD_SLOT_SUCCESS,
    COMMON_ADD_SLOT_FAILURE,
    COMMON_ADD_SLOT_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function addSlot(userData = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_ADD_SLOT_BEGIN,
        });

        return fetch('https://videovaultusers.herokuapp.com/add_slot', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.success !== undefined) {
                    dispatch({
                        type: COMMON_ADD_SLOT_SUCCESS,
                        data: true,
                        userData: createdJson,
                    });
                } else {
                    dispatch({
                        type: COMMON_ADD_SLOT_FAILURE,
                        error: createdJson,
                        data: false,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_ADD_SLOT_FAILURE,
                    error,
                    data: false,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAddSlotError() {
    return {
        type: COMMON_ADD_SLOT_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_ADD_SLOT_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            addSlotPending: true,
            addSlotError: null,
        };

    case COMMON_ADD_SLOT_SUCCESS:
        // The request is success
        return {
            ...state,
            addSlotPending: false,
            addSlotError: null,
        };

    case COMMON_ADD_SLOT_FAILURE:
        // The request is failed
        return {
            ...state,
            addSlotPending: false,
            addSlotError: action.data.error,
        };

    case COMMON_ADD_SLOT_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            addSlotError: null,
        };

    default:
        return state;
    }
}
