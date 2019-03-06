import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_MOVIES_BEGIN,
  COMMON_MOVIES_SUCCESS,
  COMMON_MOVIES_FAILURE,
  COMMON_MOVIES_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  movies,
  dismissMoviesError,
  reducer,
} from '../../../../src/features/common/redux/movies';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/movies', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when movies succeeds', () => {
    const store = mockStore({});

    return store.dispatch(movies())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_MOVIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_MOVIES_SUCCESS);
      });
  });

  it('dispatches failure action when movies fails', () => {
    const store = mockStore({});

    return store.dispatch(movies({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_MOVIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_MOVIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissMoviesError', () => {
    const expectedAction = {
      type: COMMON_MOVIES_DISMISS_ERROR,
    };
    expect(dismissMoviesError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_MOVIES_BEGIN correctly', () => {
    const prevState = { moviesPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_MOVIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.moviesPending).toBe(true);
  });

  it('handles action type COMMON_MOVIES_SUCCESS correctly', () => {
    const prevState = { moviesPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_MOVIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.moviesPending).toBe(false);
  });

  it('handles action type COMMON_MOVIES_FAILURE correctly', () => {
    const prevState = { moviesPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_MOVIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.moviesPending).toBe(false);
    expect(state.moviesError).toEqual(expect.anything());
  });

  it('handles action type COMMON_MOVIES_DISMISS_ERROR correctly', () => {
    const prevState = { moviesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_MOVIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.moviesError).toBe(null);
  });
});

