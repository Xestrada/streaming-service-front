import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_RATED_MOVIES_BEGIN,
  COMMON_RATED_MOVIES_SUCCESS,
  COMMON_RATED_MOVIES_FAILURE,
  COMMON_RATED_MOVIES_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  ratedMovies,
  dismissRatedMoviesError,
  reducer,
} from '../../../../src/features/common/redux/ratedMovies';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/ratedMovies', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when ratedMovies succeeds', () => {
    const store = mockStore({});

    return store.dispatch(ratedMovies())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_RATED_MOVIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_RATED_MOVIES_SUCCESS);
      });
  });

  it('dispatches failure action when ratedMovies fails', () => {
    const store = mockStore({});

    return store.dispatch(ratedMovies({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_RATED_MOVIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_RATED_MOVIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRatedMoviesError', () => {
    const expectedAction = {
      type: COMMON_RATED_MOVIES_DISMISS_ERROR,
    };
    expect(dismissRatedMoviesError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_RATED_MOVIES_BEGIN correctly', () => {
    const prevState = { ratedMoviesPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_RATED_MOVIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.ratedMoviesPending).toBe(true);
  });

  it('handles action type COMMON_RATED_MOVIES_SUCCESS correctly', () => {
    const prevState = { ratedMoviesPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_RATED_MOVIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.ratedMoviesPending).toBe(false);
  });

  it('handles action type COMMON_RATED_MOVIES_FAILURE correctly', () => {
    const prevState = { ratedMoviesPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_RATED_MOVIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.ratedMoviesPending).toBe(false);
    expect(state.ratedMoviesError).toEqual(expect.anything());
  });

  it('handles action type COMMON_RATED_MOVIES_DISMISS_ERROR correctly', () => {
    const prevState = { ratedMoviesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_RATED_MOVIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.ratedMoviesError).toBe(null);
  });
});

