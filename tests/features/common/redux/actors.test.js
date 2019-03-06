import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_ACTORS_BEGIN,
  COMMON_ACTORS_SUCCESS,
  COMMON_ACTORS_FAILURE,
  COMMON_ACTORS_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  actors,
  dismissActorsError,
  reducer,
} from '../../../../src/features/common/redux/actors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/actors', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when actors succeeds', () => {
    const store = mockStore({});

    return store.dispatch(actors())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ACTORS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ACTORS_SUCCESS);
      });
  });

  it('dispatches failure action when actors fails', () => {
    const store = mockStore({});

    return store.dispatch(actors({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ACTORS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ACTORS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissActorsError', () => {
    const expectedAction = {
      type: COMMON_ACTORS_DISMISS_ERROR,
    };
    expect(dismissActorsError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_ACTORS_BEGIN correctly', () => {
    const prevState = { actorsPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_ACTORS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actorsPending).toBe(true);
  });

  it('handles action type COMMON_ACTORS_SUCCESS correctly', () => {
    const prevState = { actorsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ACTORS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actorsPending).toBe(false);
  });

  it('handles action type COMMON_ACTORS_FAILURE correctly', () => {
    const prevState = { actorsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ACTORS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actorsPending).toBe(false);
    expect(state.actorsError).toEqual(expect.anything());
  });

  it('handles action type COMMON_ACTORS_DISMISS_ERROR correctly', () => {
    const prevState = { actorsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_ACTORS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actorsError).toBe(null);
  });
});

