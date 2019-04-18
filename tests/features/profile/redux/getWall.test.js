import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PROFILE_GET_WALL_BEGIN,
  PROFILE_GET_WALL_SUCCESS,
  PROFILE_GET_WALL_FAILURE,
  PROFILE_GET_WALL_DISMISS_ERROR,
} from '../../../../src/features/profile/redux/constants';

import {
  getWall,
  dismissGetWallError,
  reducer,
} from '../../../../src/features/profile/redux/getWall';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profile/redux/getWall', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getWall succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getWall())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PROFILE_GET_WALL_BEGIN);
        expect(actions[1]).toHaveProperty('type', PROFILE_GET_WALL_FAILURE);
      });
  });

  it('dispatches failure action when getWall fails', () => {
    const store = mockStore({});

    return store.dispatch(getWall({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PROFILE_GET_WALL_BEGIN);
        expect(actions[1]).toHaveProperty('type', PROFILE_GET_WALL_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetWallError', () => {
    const expectedAction = {
      type: PROFILE_GET_WALL_DISMISS_ERROR,
    };
    expect(dismissGetWallError()).toEqual(expectedAction);
  });

  it('handles action type PROFILE_GET_WALL_BEGIN correctly', () => {
    const prevState = { getWallPending: false };
    const state = reducer(
      prevState,
      { type: PROFILE_GET_WALL_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWallPending).toBe(true);
  });

  it('handles action type PROFILE_GET_WALL_SUCCESS correctly', () => {
    const prevState = { getWallPending: true };
    const state = reducer(
      prevState,
      { type: PROFILE_GET_WALL_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWallPending).toBe(false);
  });

  it('handles action type PROFILE_GET_WALL_FAILURE correctly', () => {
    const prevState = { getWallPending: true };
    const state = reducer(
      prevState,
      { type: PROFILE_GET_WALL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWallPending).toBe(false);
    expect(state.getWallError).toEqual(undefined);
  });

  it('handles action type PROFILE_GET_WALL_DISMISS_ERROR correctly', () => {
    const prevState = { getWallError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PROFILE_GET_WALL_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWallError).toBe(null);
  });
});

