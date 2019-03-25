import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MEDIA_RENT_MOVIE_BEGIN,
  MEDIA_RENT_MOVIE_SUCCESS,
  MEDIA_RENT_MOVIE_FAILURE,
  MEDIA_RENT_MOVIE_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
  rentMovie,
  dismissRentMovieError,
  reducer,
} from '../../../../src/features/media/redux/rentMovie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/rentMovie', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when rentMovie succeeds', () => {
    const store = mockStore({});

    return store.dispatch(rentMovie())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_RENT_MOVIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_RENT_MOVIE_SUCCESS);
      });
  });

  it('dispatches failure action when rentMovie fails', () => {
    const store = mockStore({});

    return store.dispatch(rentMovie({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_RENT_MOVIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_RENT_MOVIE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRentMovieError', () => {
    const expectedAction = {
      type: MEDIA_RENT_MOVIE_DISMISS_ERROR,
    };
    expect(dismissRentMovieError()).toEqual(expectedAction);
  });

  it('handles action type MEDIA_RENT_MOVIE_BEGIN correctly', () => {
    const prevState = { rentMoviePending: false };
    const state = reducer(
      prevState,
      { type: MEDIA_RENT_MOVIE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rentMoviePending).toBe(true);
  });

  it('handles action type MEDIA_RENT_MOVIE_SUCCESS correctly', () => {
    const prevState = { rentMoviePending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_RENT_MOVIE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rentMoviePending).toBe(false);
  });

  it('handles action type MEDIA_RENT_MOVIE_FAILURE correctly', () => {
    const prevState = { rentMoviePending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_RENT_MOVIE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rentMoviePending).toBe(false);
    expect(state.rentMovieError).toEqual(expect.anything());
  });

  it('handles action type MEDIA_RENT_MOVIE_DISMISS_ERROR correctly', () => {
    const prevState = { rentMovieError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEDIA_RENT_MOVIE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rentMovieError).toBe(null);
  });
});

