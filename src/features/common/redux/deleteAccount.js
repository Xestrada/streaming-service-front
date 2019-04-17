import {
    COMMON_DELETE_ACCOUNT_BEGIN,
    COMMON_DELETE_ACCOUNT_SUCCESS,
    COMMON_DELETE_ACCOUNT_FAILURE,
    COMMON_DELETE_ACCOUNT_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function deleteAccount(info = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_DELETE_ACCOUNT_BEGIN,
        });

        const values = JSON.stringify(info);

        return fetch('https://videovaultusers.herokuapp.com/account/delete', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: values,
        })
            .then(response => response.json()).then((createdJson) => {
                if (createdJson.success) {
                    dispatch({
                        type: COMMON_DELETE_ACCOUNT_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: COMMON_DELETE_ACCOUNT_FAILURE,
                        error: createdJson,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_DELETE_ACCOUNT_FAILURE,
                    error,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissDeleteAccountError() {
    return {
        type: COMMON_DELETE_ACCOUNT_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_DELETE_ACCOUNT_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            deleteAccountPending: true,
            deleteAccountError: null,
        };

    case COMMON_DELETE_ACCOUNT_SUCCESS:
        // The request is success
        return {
            ...state,
            deleteAccountPending: false,
            deleteAccountError: null,
        };

    case COMMON_DELETE_ACCOUNT_FAILURE:
        // The request is failed
        return {
            ...state,
            deleteAccountPending: false,
            deleteAccountError: action.error,
        };

    case COMMON_DELETE_ACCOUNT_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            deleteAccountError: null,
        };

    default:
        return state;
    }
}
