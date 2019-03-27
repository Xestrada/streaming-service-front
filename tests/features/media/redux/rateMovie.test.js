import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MEDIA_RATE_MOVIE_BEGIN,
  MEDIA_RATE_MOVIE_SUCCESS,
  MEDIA_RATE_MOVIE_FAILURE,
  MEDIA_RATE_MOVIE_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
  rateMovie,
  dismissRateMovieError,
  reducer,
} from '../../../../src/features/media/redux/rateMovie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/rateMovie', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when rateMovie succeeds', () => {
    const store = mockStore({});

    return store.dispatch(rateMovie())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_SUCCESS);
      });
  });

  it('dispatches failure action when rateMovie fails', () => {
    const store = mockStore({});

    return store.dispatch(rateMovie({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRateMovieError', () => {
    const expectedAction = {
      type: MEDIA_RATE_MOVIE_DISMISS_ERROR,
    };
    expect(dismissRateMovieError()).toEqual(expectedAction);
  });

  it('handles action type MEDIA_RATE_MOVIE_BEGIN correctly', () => {
    const prevState = { rateMoviePending: false };
    const state = reducer(
      prevState,
      { type: MEDIA_RATE_MOVIE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rateMoviePending).toBe(true);
  });

  it('handles action type MEDIA_RATE_MOVIE_SUCCESS correctly', () => {
    const prevState = { rateMoviePending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_RATE_MOVIE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rateMoviePending).toBe(false);
  });

  it('handles action type MEDIA_RATE_MOVIE_FAILURE correctly', () => {
    const prevState = { rateMoviePending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_RATE_MOVIE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rateMoviePending).toBe(false);
    expect(state.rateMovieError).toEqual(expect.anything());
  });

  it('handles action type MEDIA_RATE_MOVIE_DISMISS_ERROR correctly', () => {
    const prevState = { rateMovieError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEDIA_RATE_MOVIE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rateMovieError).toBe(null);
  });
});

