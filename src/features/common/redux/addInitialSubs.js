import {
    COMMON_ADD_INITIAL_SUBS_BEGIN,
    COMMON_ADD_INITIAL_SUBS_SUCCESS,
    COMMON_ADD_INITIAL_SUBS_FAILURE,
    COMMON_ADD_INITIAL_SUBS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function addInitialSubs(data = {}) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_ADD_INITIAL_SUBS_BEGIN,
        });

        const values = JSON.stringify(data);
        console.log(values);

        return fetch('https://videovaultusers.herokuapp.com/resub', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: values,
        })
            .then(response => response.json()).then((createdJson) => {
              console.log(createdJson);
              console.log(createdJson['success:'])
                if (createdJson['success:']) {
                    dispatch({
                        type: COMMON_ADD_INITIAL_SUBS_SUCCESS,
                        data: true,
                        userData: createdJson,
                    });
                } else {
                    dispatch({
                        type: COMMON_ADD_INITIAL_SUBS_FAILURE,
                        error: createdJson,
                        data: false,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_ADD_INITIAL_SUBS_FAILURE,
                    error,
                    data: false,
                });
                console.log(error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAddInitialSubsError() {
    return {
        type: COMMON_ADD_INITIAL_SUBS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_ADD_INITIAL_SUBS_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            addInitialSubsPending: true,
            addInitialSubsError: null,
        };

    case COMMON_ADD_INITIAL_SUBS_SUCCESS:
        // The request is success
        return {
            ...state,
            addInitialSubsPending: false,
            addInitialSubsError: null,
            initialSub: true,
        };

    case COMMON_ADD_INITIAL_SUBS_FAILURE:
        // The request is failed
        return {
            ...state,
            addInitialSubsPending: false,
            addInitialSubsError: action.error,
            initialSub: false,
        };

    case COMMON_ADD_INITIAL_SUBS_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            addInitialSubsError: null,
        };

    default:
        return state;
    }
}
