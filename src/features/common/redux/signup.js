import {
    COMMON_SIGNUP_BEGIN,
    COMMON_SIGNUP_SUCCESS,
    COMMON_SIGNUP_FAILURE,
    COMMON_SIGNUP_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function signup(newUser = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_SIGNUP_BEGIN,
        });

        const values = JSON.stringify(newUser);

        return fetch('https://videovaultusers.herokuapp.com/signup', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: values,
        })
            .then(response => response.json()).then((createdJson) => {
                console.log(createdJson);
                if (createdJson.username !== undefined) {
                    dispatch({
                        type: COMMON_SIGNUP_SUCCESS,
                        data: true,
                        userData: createdJson,
                    });
                } else {
                    dispatch({
                        type: COMMON_SIGNUP_FAILURE,
                        data: false,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_SIGNUP_FAILURE,
                    error,
                    data: false,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSignupError() {
    return {
        type: COMMON_SIGNUP_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_SIGNUP_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            signupPending: true,
            signupError: null,
        };

    case COMMON_SIGNUP_SUCCESS:
        // The request is success
        return {
            ...state,
            signupPending: false,
            signupError: null,
            authen: true,
            userData: action.userData,
        };

    case COMMON_SIGNUP_FAILURE:
        // The request is failed
        return {
            ...state,
            signupPending: false,
            signupError: action.error.error,
            authen: false,
            userData: null,
        };

    case COMMON_SIGNUP_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            signupError: null,
        };

    default:
        return state;
    }
}
