import {
    COMMON_AUTHEN_BEGIN,
    COMMON_AUTHEN_SUCCESS,
    COMMON_AUTHEN_FAILURE,
    COMMON_AUTHEN_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function authen(username, pass) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_AUTHEN_BEGIN,
        });

        return fetch(`https://videovaultusers.herokuapp.com/login/email=${username}/password=${pass}`)
            .then(response => response.json())
            .then((createdJson) => {
                if (createdJson.username !== undefined) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('id', createdJson.id);
                    localStorage.setItem('email', createdJson.email);
                    dispatch({
                        type: COMMON_AUTHEN_SUCCESS,
                        userData: createdJson,
                    });
                } else {
                    dispatch({
                        type: COMMON_AUTHEN_FAILURE,
                        error: createdJson,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_AUTHEN_FAILURE,
                    error,
                });
            });
    };
}

export function signOut() {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_AUTHEN_BEGIN,
        });
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        dispatch({
            type: 'Sign Out',
            data: false,
            userData: null,
        });

    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAuthenError() {
    return {
        type: COMMON_AUTHEN_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_AUTHEN_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            authenPending: true,
            authenError: null,
        };

    case COMMON_AUTHEN_SUCCESS:
        // The request is success
        return {
            ...state,
            authenPending: false,
            authenError: null,
            authen: true,
            userData: action.userData,
        };

    case COMMON_AUTHEN_FAILURE:
        // The request is failed
        return {
            ...state,
            authenPending: false,
            authenError: action.error,
            authen: false,
            userData: null,
        };

    case COMMON_AUTHEN_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            authenError: null,
        };

    case 'Sign Out':
        // Dismiss the request failure error
        return {
            ...state,
            authenError: null,
            authenPending: false,
            authen: false,
            userData: null,
        };

    default:
        return state;
    }
}
