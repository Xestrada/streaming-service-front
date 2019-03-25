import {
  MEDIA_RENT_MOVIE_BEGIN,
  MEDIA_RENT_MOVIE_SUCCESS,
  MEDIA_RENT_MOVIE_FAILURE,
  MEDIA_RENT_MOVIE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function rentMovie(info = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: MEDIA_RENT_MOVIE_BEGIN,
    });

    const values = JSON.stringify(info);

    return fetch('https://videovaultusers.herokuapp.com/rent_movie', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: values,
    })
        .then(response => response.json()).then((createdJson) => {
            if (createdJson.success) {
                dispatch({
                    type: MEDIA_RENT_MOVIE_SUCCESS,
                });
            } else {
                dispatch({
                    type: MEDIA_RENT_MOVIE_FAILURE,
                    error: createdJson,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: MEDIA_RENT_MOVIE_FAILURE,
                error,
            });
            console.log(error);
        });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissRentMovieError() {
  return {
    type: MEDIA_RENT_MOVIE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MEDIA_RENT_MOVIE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        rentMoviePending: true,
        rentMovieError: null,
      };

    case MEDIA_RENT_MOVIE_SUCCESS:
      // The request is success
      return {
        ...state,
        rentMoviePending: false,
        rentMovieError: null,
      };

    case MEDIA_RENT_MOVIE_FAILURE:
      // The request is failed
      return {
        ...state,
        rentMoviePending: false,
        rentMovieError: action.data.error,
      };

    case MEDIA_RENT_MOVIE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        rentMovieError: null,
      };

    default:
      return state;
  }
}
