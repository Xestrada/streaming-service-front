import {
    COMMON_SEARCH_BEGIN,
    COMMON_SEARCH_SUCCESS,
    COMMON_SEARCH_FAILURE,
    COMMON_SEARCH_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getRecents(pageNum) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_SEARCH_BEGIN,
        });

        return fetch(`https://ss-media-middle.herokuapp.com/recently_added/page=${pageNum}`)
            .then((response) => {
                dispatch({
                    type: 'Header Data',
                    maxPages: response.headers.get('max_pages'),
                });
                return response.json();
            })
            .then((createdJson) => {
                dispatch({
                    type: COMMON_SEARCH_SUCCESS,
                    data: createdJson,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_SEARCH_FAILURE,
                    data: error,
                });
                console.log('Error: ', error);
            });
    };
}

export function searchBy(filter, query, pageNum) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_SEARCH_BEGIN,
        });

        const url = filter === 'search/user' ? 'videovaultusers.herokuapp.com' : 'ss-media-middle.herokuapp.com';

        return fetch(`https://${url}/${filter}=${query}/page=${pageNum}`)
            .then((response) => {
                dispatch({
                    type: 'Header Data',
                    maxPages: response.headers.get('max_pages'),
                });
                return response.json();
            })
            .then((createdJson) => {
                dispatch({
                    type: COMMON_SEARCH_SUCCESS,
                    data: createdJson,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMMON_SEARCH_FAILURE,
                    error,
                });
                console.log('Error: ', error);
            });
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSearchError() {
    return {
        type: COMMON_SEARCH_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
    case COMMON_SEARCH_BEGIN:
        // Just after a request is sent
        return {
            ...state,
            searchPending: true,
            searchError: undefined,
            data: [],
        };

    case COMMON_SEARCH_SUCCESS:
        // The request is success
        return {
            ...state,
            searchPending: false,
            searchError: undefined,
            data: action.data[Object.keys(action.data)[0]],
        };

    case COMMON_SEARCH_FAILURE:
        // The request is failed
        return {
            ...state,
            searchPending: false,
            searchError: action.error,
        };

    case COMMON_SEARCH_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
            ...state,
            searchError: null,
        };
    case 'Header Data':
        return {
            ...state,
            maxPages: action.maxPages,
        };

    default:
        return state;
    }
}
