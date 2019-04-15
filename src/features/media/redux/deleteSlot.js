import {
    MEDIA_DELETE_SLOT_BEGIN,
    MEDIA_DELETE_SLOT_SUCCESS,
    MEDIA_DELETE_SLOT_FAILURE,
    MEDIA_DELETE_SLOT_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function deleteSlot(uid) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: MEDIA_DELETE_SLOT_BEGIN,
        });

        return fetch('https://videovaultusers.herokuapp.com/delete_slot', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: uid,
            }),
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.success !== undefined && createdJson.success) {
                    dispatch({
                        type: MEDIA_DELETE_SLOT_SUCCESS,

                    });
                } else {
                    dispatch({
                        type: MEDIA_DELETE_SLOT_FAILURE,
                        error: createdJson.is_slot_exist,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: MEDIA_DELETE_SLOT_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissDeleteSlotError() {
    return {
        type: MEDIA_DELETE_SLOT_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case MEDIA_DELETE_SLOT_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            deleteSlotPending: true,
            deleteSlotError: null,
        };

    case MEDIA_DELETE_SLOT_SUCCESS:
        // The request is success
        return {
            ...state,
            deleteSlotPending: false,
            deleteSlotError: null,
        };

    case MEDIA_DELETE_SLOT_FAILURE:
        // The request is failed
        return {
            ...state,
            deleteSlotPending: false,
            deleteSlotError: action.error,
        };

    case MEDIA_DELETE_SLOT_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            deleteSlotError: null,
        };

    default:
        return state;
    }
}
